"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderDetails {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  orderNotes?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  colorValue?: string;
  colorName?: string;
  productImage?: string;
  productCategory?: string;
  total: number;
  amountPaid: number;
  paymentMethod: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Main component that doesn't directly use useSearchParams
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderLoadingSkeleton />}>
      <OrderContent />
    </Suspense>
  );
}

// Loading skeleton component
function OrderLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <h2 className="text-xl font-semibold mt-4">Loading order details...</h2>
    </div>
  );
}

// Client component that uses useSearchParams
function OrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Get order ID from URL parameters
      const orderId = searchParams.get("orderId");

      if (!orderId) {
        // Redirect to home if no order ID is present
        router.push("/");
        return;
      }

      try {
        setIsLoading(true);
        // Fetch order details from API
        const response = await fetch(`/api/orders/${orderId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error: any) {
        console.error("Error fetching order details:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [router, searchParams]);

  // Calculate estimated delivery date (7 days from order creation)
  const getEstimatedDelivery = (createdAt: string) => {
    const orderDate = new Date(createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    return deliveryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format order date
  const formatOrderDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <h2 className="text-xl font-semibold mt-4">Loading order details...</h2>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold font-playfair mb-4">
          Order Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          {error || "Unable to load order details"}
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle2 className="h-24 w-24 text-green-500" />
          </motion.div>
          <h1 className="text-4xl font-bold font-playfair mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8 overflow-hidden border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-playfair">
                Order Summary
              </h2>
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                Order #{orderDetails.id.slice(-6)}
              </span>
            </div>

            <Separator className="my-4" />

            <div className="flex items-start space-x-6 mb-6">
              {orderDetails.productImage && (
                <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-muted hidden md:block">
                  <Image
                    src={orderDetails.productImage}
                    alt={orderDetails.productName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-medium text-lg">
                  {orderDetails.productName}
                </h3>
                {orderDetails.productCategory && (
                  <p className="text-sm text-muted-foreground">
                    Category: {orderDetails.productCategory}
                  </p>
                )}
                {orderDetails.colorName && (
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    Color: {orderDetails.colorName}
                    {orderDetails.colorValue && (
                      <span
                        className="ml-2 inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: orderDetails.colorValue }}
                      />
                    )}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm">
                    Rs. {orderDetails.productPrice.toLocaleString()} ×{" "}
                    {orderDetails.quantity}
                  </div>
                </div>{" "}
                <p className="font-medium text-lg mt-4">
                  Total: Rs. {orderDetails.total.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment information */}
            <div className="mt-4">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  orderDetails.amountPaid > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <span className="font-medium">
                  {orderDetails.amountPaid > 0
                    ? "Payment Completed"
                    : "Payment Pending"}
                </span>
              </div>{" "}
              {orderDetails.amountPaid > 0 && (
                <div className="mt-2 text-sm">
                  <p>
                    Amount Paid: Rs. {orderDetails.amountPaid.toLocaleString()}
                  </p>
                  {orderDetails.paymentDate && (
                    <p>
                      Payment Date:{" "}
                      {new Date(orderDetails.paymentDate).toLocaleDateString()}
                    </p>
                  )}
                  {orderDetails.paymentMethod && (
                    <p>
                      Payment Method:{" "}
                      {orderDetails.paymentMethod === "PAYHERE"
                        ? "PayHere"
                        : orderDetails.paymentMethod}
                    </p>
                  )}
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-muted/10 rounded-lg">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Order Date</h4>
                <p className="text-sm text-muted-foreground">
                  {formatOrderDate(orderDetails.createdAt)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/10 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Estimated Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  {getEstimatedDelivery(orderDetails.createdAt)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/10 rounded-lg">
                <PackageCheck className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Delivery Method</h4>
                <p className="text-sm text-muted-foreground">
                  Standard Delivery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden border-primary/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold font-playfair mb-4">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p>
                  {orderDetails.firstName} {orderDetails.lastName}
                </p>
                <p>{orderDetails.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p>{orderDetails.addressLine1}</p>
                {orderDetails.addressLine2 && (
                  <p>{orderDetails.addressLine2}</p>
                )}
                <p>
                  {orderDetails.city}, {orderDetails.province}
                </p>
              </div>
            </div>
            {orderDetails.orderNotes && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Order Notes</h4>
                <p className="text-muted-foreground">
                  {orderDetails.orderNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="font-montserrat transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary"
          >
            <Link href="/contact">
              Need Help? Contact Us
              <motion.div whileHover={{ scale: 1.1 }} className="ml-2">
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p className="mb-2">We have successfully received your order.</p>
          <p>
            We will give you a call shortly to confirm the delivery details.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
