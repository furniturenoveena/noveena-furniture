"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Truck,
  Check,
  Loader2,
} from "lucide-react";
import { PaymentConfirmationModal } from "@/components/payment-confirmation-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { sendSMS } from "@/lib/notify";

// Product type should match your schema
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  image: string;
  category: {
    name: string;
    type: "IMPORTED_USED" | "BRAND_NEW";
  };
  tieredPricing?: { min: number; max: number; price: number }[];
}

// Main page component with proper Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold">Loading checkout...</h2>
        </div>
      }
    >
      <CheckoutContentWrapper />
    </Suspense>
  );
}

// Wrapper component that safely uses useSearchParams
function CheckoutContentWrapper() {
  const searchParams = useSearchParams();
  const [searchParamsData, setSearchParamsData] = useState({
    productId: "",
    quantity: 1,
    paymentOption: "full",
    advancePayment: 30,
    colorId: "",
  });

  useEffect(() => {
    const productId = searchParams.get("productId") || "";
    const qty = searchParams.get("quantity");
    const payment = searchParams.get("paymentOption");
    const advance = searchParams.get("advancePayment");
    const color = searchParams.get("colorId");

    setSearchParamsData({
      productId,
      quantity: qty ? parseInt(qty, 10) : 1,
      paymentOption: payment || "full",
      advancePayment: advance ? parseInt(advance, 10) : 30,
      colorId: color || "",
    });
  }, [searchParams]);

  return <CheckoutContent searchParamsData={searchParamsData} />;
}

// Main checkout content that receives parameters as props
function CheckoutContent({
  searchParamsData,
}: {
  searchParamsData: {
    productId: string;
    quantity: number;
    paymentOption: string;
    advancePayment: number;
    colorId: string;
  };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(searchParamsData.quantity);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment related states
  const [paymentOption, setPaymentOption] = useState(
    searchParamsData.paymentOption
  );
  const [advancePayment, setAdvancePayment] = useState(
    searchParamsData.advancePayment
  );
  const [colorId, setColorId] = useState(searchParamsData.colorId);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    orderNotes: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
  });

  // Handle form change
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get product details from productId
  useEffect(() => {
    const fetchProduct = async () => {
      const productId = searchParamsData.productId;

      if (!productId) {
        router.push("/");
        return;
      }

      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data.data || data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Could not load product details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [searchParamsData.productId, router, toast]);

  // Calculate total - remove delivery fee and keep only discounts from tiered pricing
  let unitPrice = product ? product.price : 0;
  let total = 0;

  // Apply tiered pricing if available
  if (product?.tieredPricing && product.tieredPricing.length > 0) {
    const applicableTier = product.tieredPricing.find(
      (tier) => quantity >= tier.min && quantity <= tier.max
    );

    if (applicableTier) {
      unitPrice = applicableTier.price;
    }
  }

  // Calculate final total
  total = unitPrice * quantity;

  // Calculate advance and balance amounts
  const advanceAmount =
    paymentOption === "advance" ? total * (advancePayment / 100) : total;
  const balanceAmount = paymentOption === "advance" ? total - advanceAmount : 0;

  // Payment confirmation modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.province
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Open payment confirmation modal
    setIsPaymentModalOpen(true);
  };

  // Handle payment confirmation and order submission
  const handlePaymentConfirmed = async () => {
    setIsSubmitting(true);

    try {
      // Prepare order data with the new payment information
      const orderData = {
        ...formData,
        productId: product?.id,
        productName: product?.name,
        productPrice: product?.price,
        quantity,
        colorId,
        productImage: product?.image,
        productCategory: product?.category?.name,
        total,
        paymentMethod: "PAYHERE",
        amountPaid: advanceAmount,
        paymentStatus: "PAID",
        paymentDate: new Date().toISOString(),
      };

      // Submit order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      // Send SMS notification
      const customerName = `${formData.firstName} ${formData.lastName}`;
      const paymentInfo =
        advanceAmount === total
          ? `full payment of Rs.${advanceAmount.toLocaleString()} via PayHere`
          : `advance payment of Rs.${advanceAmount.toLocaleString()} via PayHere (balance due: Rs.${balanceAmount.toLocaleString()})`;
      const smsMessage = `New Order: ${customerName} has ordered ${quantity}x ${
        product?.name
      } for Rs.${total.toLocaleString()}, with ${paymentInfo}. Customer phone: ${
        formData.phone
      }`;

      // Send SMS asynchronously (we don't need to wait for it)
      sendSMS({ message: smsMessage }).catch((error) => {
        console.error("Failed to send SMS notification:", error);
        // We don't show this error to the user as the order was successful
      });

      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase! We'll contact you soon.",
      });

      // Redirect to the success page with order details
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch (error: any) {
      console.error("Order submission error:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
      setIsPaymentModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sri Lankan provinces for the select dropdown
  const provinces = [
    "Western Province",
    "Central Province",
    "Southern Province",
    "Northern Province",
    "Eastern Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province",
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold">Loading checkout...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 font-playfair">
          Product Not Found
        </h1>
        <p className="mb-6">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Form */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-3xl font-bold font-playfair"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Checkout
            </motion.h1>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/product/${product.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Product
              </Link>
            </Button>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Please provide your contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 077 1234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                  <Textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleFormChange}
                    placeholder="Add any special instructions or notes about your order"
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">
                  Shipping Address
                </CardTitle>
                <CardDescription>
                  Where should we deliver your furniture?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">
                    Address Line 2 (Optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province *</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) =>
                        handleSelectChange("province", value)
                      }
                      required
                    >
                      <SelectTrigger id="province">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method - Could be extended as needed */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Payment Method</CardTitle>
                <CardDescription>
                  Select your preferred payment option
                </CardDescription>
              </CardHeader>{" "}
              <CardContent>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 bg-muted/20 p-3 rounded-md">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="payhere"
                      defaultChecked
                      className="h-5 w-5 accent-primary"
                    />
                    <Label
                      htmlFor="payhere"
                      className="font-medium flex items-center"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      PayHere
                    </Label>
                  </div>
                  <div className="text-sm text-muted-foreground pl-8 py-2">
                    Pay advance to confirm your order with secure online payment
                  </div>

                  {advanceAmount !== total && (
                    <div className="border border-primary/20 rounded-md p-3 bg-primary/5 mt-2">
                      <p className="text-sm font-medium mb-2">
                        Payment Breakdown:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Advance Payment:
                          </p>
                          <p className="font-medium">
                            Rs. {advanceAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Balance Payment:
                          </p>
                          <p className="font-medium">
                            Rs. {balanceAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        * Balance will be collected upon delivery
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="lg:hidden">
              <OrderSummary
                product={product}
                quantity={quantity}
                total={total}
                advanceAmount={advanceAmount}
                balanceAmount={balanceAmount}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto font-montserrat transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.1 }} className="mr-2">
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sticky top-32"
          >
            <OrderSummary
              product={product}
              quantity={quantity}
              total={total}
              advanceAmount={advanceAmount}
              balanceAmount={balanceAmount}
            />
          </motion.div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onConfirmPayment={handlePaymentConfirmed}
        isSubmitting={isSubmitting}
        total={total}
        advanceAmount={advanceAmount}
        productName={product?.name || ""}
      />
    </div>
  );
}

function OrderSummary({
  product,
  quantity,
  total,
  advanceAmount,
  balanceAmount,
}: {
  product: Product;
  quantity: number;
  total: number;
  advanceAmount: number;
  balanceAmount: number;
}) {
  return (
    <Card className="bg-muted/10 border-primary/10">
      <CardHeader>
        <CardTitle className="font-playfair">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <div className="text-sm text-muted-foreground">
              Category: {product.category.name}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                Rs. {product.price.toLocaleString()} × {quantity}
              </div>
              <div className="font-medium">Rs. {total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          {advanceAmount !== total && (
            <>
              <div className="flex justify-between text-sm">
                <span>Advance Payment</span>
                <span>Rs. {advanceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Balance Payment</span>
                <span>Rs. {balanceAmount.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-green-600 dark:text-green-500">
            <Check className="mr-2 h-4 w-4" />
            <span>Free white-glove delivery within Colombo</span>
          </div>
          <div className="flex items-center">
            <Truck className="mr-2 h-4 w-4" />
            <span>Estimated delivery: 2-7 business days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
