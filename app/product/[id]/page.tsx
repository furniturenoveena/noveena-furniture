"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ArrowRight,
  Check,
  Info,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductCard from "@/components/product-card";
import { useToast } from "@/components/ui/use-toast";
import { Product as PrismaProduct, Category } from "@/lib/generated/prisma";

interface Product extends PrismaProduct {
  category: Category;
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(30); // Default 30% advance
  const [paymentOption, setPaymentOption] = useState("advance");
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // No default color selection
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data: Product = await response.json();
        setProduct(data);

        // No default color selection now
        // We'll start with product's default images

        // Set initial price
        setCurrentPrice(data.price);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Get selected color data
  const selectedColorData = selectedColor
    ? product?.colors.find((color) => color.id === selectedColor) || null
    : null;

  // Generate product images based on selected color or use default product images
  const productImages = selectedColorData
    ? [
        selectedColorData.images.image1,
        selectedColorData.images.image2 || "/placeholder.svg",
        selectedColorData.images.image3 || "/placeholder.svg",
        selectedColorData.images.image4 || "/placeholder.svg",
      ].filter(Boolean)
    : product
    ? [
        product.images.image1,
        product.images.image2 || "/placeholder.svg",
        product.images.image3 || "/placeholder.svg",
        product.images.image4 || "/placeholder.svg",
      ].filter(Boolean)
    : ["/placeholder.svg"];

  // Handle image zoom functionality
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Fetch similar products
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!product) return;

      try {
        // This would be a more complete implementation:
        // const response = await fetch(`/api/products/similar?categoryId=${product.categoryId}&excludeId=${product.id}`);
        // const data = await response.json();
        // setSimilarProducts(data);

        // For now, just set an empty array since we don't have this endpoint yet
        setSimilarProducts([]);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchSimilarProducts();
  }, [product]);

  useEffect(() => {
    if (!product) return;

    // Check if product has tiered pricing
    if (product.tieredPricing && product.tieredPricing.length > 0) {
      const tier = product.tieredPricing.find(
        (tier) => quantity >= tier.min && quantity <= tier.max
      );

      if (tier) {
        setCurrentPrice(tier.price);
      } else {
        setCurrentPrice(product.price);
      }
    } else {
      setCurrentPrice(product.price);
    }
  }, [product, quantity]);

  // Calculate total price whenever currentPrice or quantity changes
  useEffect(() => {
    // Calculate total price
    const total = currentPrice * quantity;
    setTotalPrice(total);

    // Calculate advance and balance
    const advance = total * (advancePayment / 100);
    setAdvanceAmount(advance);
    setBalanceAmount(total - advance);
  }, [currentPrice, quantity, advancePayment]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-xl font-semibold">Loading product details...</h2>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <h1 className="text-2xl font-bold mb-4 font-playfair">
          {error || "Product Not Found"}
        </h1>
        <p className="mb-6 body-elegant">
          Sorry, the product you are looking for could not be loaded.
        </p>
        <Button asChild>
          <Link href="/category/all">Browse All Products</Link>
        </Button>
      </div>
    );
  }

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Handle add to cart
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    });
  };

  // Handle buy now with color validation
  const handleBuyNow = () => {
    // Check if a color is selected when colors are available
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description:
          "You need to choose a color before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    } // Redirect to checkout with product info and payment option
    const paymentDetails =
      paymentOption === "advance" ? `&advancePayment=${advancePayment}` : ""; // Find selected color to get its value (hex code)
    const selectedColorData = selectedColor
      ? product?.colors.find((color) => color.id === selectedColor)
      : null;

    // Only pass the color value (hex code), not the name
    const colorParam = selectedColorData
      ? `&colorValue=${encodeURIComponent(selectedColorData.value)}`
      : "";

    router.push(
      `/checkout?productId=${productId}&quantity=${quantity}${paymentDetails}${colorParam}`
    );

    toast({
      title: "Proceeding to checkout",
      description: `You're purchasing ${product.name} (${quantity}).`,
    });
  };

  const setQuantality = (value: number) => {
    setQuantity(value);
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href="/category/all"
          className="hover:text-primary transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={`/category/${product.category.name
            .toLowerCase()
            .replace(" ", "-")}`}
          className="hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-foreground truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Images - Enhanced with zoom */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col">
            <div
              ref={imageRef}
              className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden mb-4 premium-card cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeImageIndex}-${selectedColor || "default"}`} // Change key when color or image changes
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productImages[activeImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} ${
                      selectedColorData ? `in ${selectedColorData.name}` : ""
                    }`}
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      isZoomed ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {isZoomed && (
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        backgroundImage: `url(${productImages[activeImageIndex]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: "200%",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {product.category.type === "IMPORTED_USED" && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="secondary" className="bg-primary text-white">
                    Imported Used
                  </Badge>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <div
                  key={`${selectedColor || "default"}-${index}`}
                  className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    activeImageIndex === index
                      ? "border-primary shadow-md scale-[1.02]"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <Badge
            variant="outline"
            className="w-fit mb-2 font-medium text-primary border-primary"
          >
            {product.category.type === "IMPORTED_USED"
              ? "Imported Used"
              : "Brand New"}
          </Badge>

          <h1 className="text-3xl font-bold font-playfair mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({product.rating})
            </span>
          </div>

          {product.tieredPricing && product.tieredPricing.length > 0 ? (
            <div className="mb-6">
              <div className="text-3xl font-semibold text-primary">
                Rs. {currentPrice.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Price per item • Quantity discounts applied
              </div>
            </div>
          ) : (
            <div className="text-3xl font-semibold mb-6">
              Rs. {product.price.toLocaleString()}
            </div>
          )}

          <p className="text-muted-foreground mb-6 body-elegant">
            {product.description}
          </p>

          <div className="space-y-6">
            {/* Quantity Selector */}
            <div>
              <h3 className="text-base font-semibold mb-3 font-cormorant">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="h-10 w-16 text-center border-0 rounded-none focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>

                {product.tieredPricing && product.tieredPricing.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <span>Total: Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {product.tieredPricing && product.tieredPricing.length > 0 && (
                <div className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Bulk discounts applied automatically</span>
                </div>
              )}
            </div>

            {/* Color Selection - Enhanced with visual indicators and required selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-base font-semibold mb-2 font-cormorant flex items-center">
                  Color
                  {selectedColorData ? (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({selectedColorData.name})
                    </span>
                  ) : (
                    <span className="ml-2 text-sm font-normal text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Required
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-3 mb-2">
                  {product.colors.map((color) => (
                    <TooltipProvider key={color.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              selectedColor === color.id
                                ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-md"
                                : "hover:scale-105 hover:shadow-sm border border-gray-200"
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => {
                              setSelectedColor(color.id);
                              setActiveImageIndex(0); // Reset to main image when changing color
                            }}
                            aria-label={`Select ${color.name} color`}
                          >
                            {selectedColor === color.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-center"
                              >
                                <Check
                                  className={`h-5 w-5 ${
                                    color.value === "#F5F5F5" ||
                                    color.value === "#FFFFFF"
                                      ? "text-black"
                                      : "text-white"
                                  }`}
                                />
                              </motion.div>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-foreground text-background px-3 py-1.5"
                        >
                          {color.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Select a color to see product in different finishes
                </div>
              </div>
            )}

            {/* Dimensions */}
            <div>
              <h3 className="text-base font-semibold mb-2 font-cormorant">
                Dimensions
              </h3>
              <div className="flex space-x-4">
                <div className="text-center bg-muted/30 px-4 py-2 rounded-md">
                  <span className="block text-sm text-muted-foreground">
                    Width
                  </span>
                  <span className="font-medium">
                    {product.dimensions.width}
                  </span>
                </div>
                <div className="text-center bg-muted/30 px-4 py-2 rounded-md">
                  <span className="block text-sm text-muted-foreground">
                    Length
                  </span>
                  <span className="font-medium">
                    {product.dimensions.length}
                  </span>
                </div>
                <div className="text-center bg-muted/30 px-4 py-2 rounded-md">
                  <span className="block text-sm text-muted-foreground">
                    Height
                  </span>
                  <span className="font-medium">
                    {product.dimensions.height}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options - Enhanced UI */}
            <div className="border rounded-lg p-4 bg-muted/5 shadow-sm">
              <h3 className="text-base font-semibold mb-3 font-cormorant">
                Payment Options
              </h3>

              <RadioGroup
                defaultValue="advance"
                onValueChange={setPaymentOption}
                className="space-y-3"
              >
                <div
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    paymentOption === "advance" ? "bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value="advance" id="advance" />
                  <Label
                    htmlFor="advance"
                    className={`font-medium ${
                      paymentOption === "advance" ? "text-primary" : ""
                    }`}
                  >
                    Advance Payment
                  </Label>
                </div>
                <AnimatePresence>
                  {paymentOption === "advance" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-6"
                    >
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label>Advance Percentage: {advancePayment}%</Label>
                            <span className="text-sm text-muted-foreground">
                              Min: 30%
                            </span>
                          </div>
                          <Slider
                            defaultValue={[30]}
                            min={30}
                            max={90}
                            step={5}
                            onValueChange={(value) =>
                              setAdvancePayment(value[0])
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-muted/30 p-2 rounded">
                            <span className="block text-muted-foreground">
                              Advance Amount:
                            </span>
                            <span className="font-semibold">
                              Rs. {Math.round(advanceAmount).toLocaleString()}
                            </span>
                          </div>
                          <div className="bg-muted/30 p-2 rounded">
                            <span className="block text-muted-foreground">
                              Balance on Delivery:
                            </span>
                            <span className="font-semibold">
                              Rs. {Math.round(balanceAmount).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    paymentOption === "full" ? "bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value="full" id="full" />
                  <Label
                    htmlFor="full"
                    className={`font-medium ${
                      paymentOption === "full" ? "text-primary" : ""
                    }`}
                  >
                    Full Payment
                  </Label>
                </div>
                <AnimatePresence>
                  {paymentOption === "full" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-6"
                    >
                      <div className="bg-muted/30 p-2 rounded text-sm">
                        <span className="block text-muted-foreground">
                          Total Amount:
                        </span>
                        <span className="font-semibold">
                          Rs. {totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground flex items-start">
                        <Check className="h-4 w-4 text-primary mr-1 mt-0.5" />
                        <span>
                          Enjoy priority delivery and complimentary setup
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RadioGroup>
            </div>

            {/* Actions - Enhanced with animations and color validation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`flex-1 font-montserrat transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary ${
                  product.colors && product.colors.length > 0 && !selectedColor
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleBuyNow}
                disabled={
                  product.colors && product.colors.length > 0 && !selectedColor
                }
              >
                <motion.div whileHover={{ scale: 1.1 }} className="mr-2">
                  <ShoppingCart className="h-5 w-5" />
                </motion.div>
                {product.colors && product.colors.length > 0 && !selectedColor
                  ? "Select a Color"
                  : "Buy Now"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 font-montserrat transition-all duration-300 hover:bg-primary/5 py-3 md:py-0"
                onClick={handleAddToCart}
                disabled={
                  product.colors && product.colors.length > 0 && !selectedColor
                }
              >
                <motion.div whileHover={{ scale: 1.1 }} className="mr-2">
                  <Heart className="h-5 w-5" />
                </motion.div>
                Add to Wishlist
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium font-cormorant">
                    White Glove Delivery
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Free delivery within Colombo with expert placement and
                    setup. Delivery charges apply for other areas. Contact us
                    for details.
                  </p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="details" className="py-3 font-montserrat">
            Details
          </TabsTrigger>
          <TabsTrigger value="features" className="py-3 font-montserrat">
            Features
          </TabsTrigger>
          <TabsTrigger value="shipping" className="py-3 font-montserrat">
            Shipping & Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="details"
          className="p-6 bg-muted/30 rounded-lg mt-6"
        >
          <h3 className="text-xl font-semibold mb-4 font-cormorant">
            Product Details
          </h3>
          <p className="mb-4 body-elegant">{product.description}</p>
          <p className="body-elegant">
            At Noveena Furniture, we take pride in offering high-quality
            furniture that combines style, comfort, and durability. This{" "}
            {product.name.toLowerCase()} is a perfect example of our commitment
            to excellence, carefully selected to enhance your living space with
            timeless elegance and superior craftsmanship.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2 font-cormorant">Dimensions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Width: {product.dimensions.width}</li>
                <li>Length: {product.dimensions.length}</li>
                <li>Height: {product.dimensions.height}</li>
              </ul>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 font-cormorant">
                  Available Colors:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color.id} className="flex items-center">
                      <div
                        className="w-5 h-5 rounded-full mr-1"
                        style={{ backgroundColor: color.value }}
                      ></div>
                      <span className="text-sm">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tiered Pricing Information */}
            {product.tieredPricing && product.tieredPricing.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 font-cormorant">
                  Quantity Discounts:
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-[300px] text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Quantity Range</th>
                        <th className="text-right py-2">Price per Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.tieredPricing
                        .sort((a, b) => a.min - b.min)
                        .map((tier, index) => (
                          <tr
                            key={index}
                            className={`border-b ${
                              quantity >= tier.min && quantity <= tier.max
                                ? "bg-primary/5"
                                : ""
                            }`}
                          >
                            <td className="py-2 pr-4">
                              {tier.min === tier.max
                                ? tier.min
                                : `${tier.min} - ${
                                    tier.max === 9999 ? "+" : tier.max
                                  }`}
                            </td>
                            <td className="text-right py-2 font-medium">
                              Rs. {tier.price.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="features"
          className="p-6 bg-muted/30 rounded-lg mt-6"
        >
          <h3 className="text-xl font-semibold mb-4 font-cormorant">
            Key Features
          </h3>
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="body-elegant">{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent
          value="shipping"
          className="p-6 bg-muted/30 rounded-lg mt-6"
        >
          <h3 className="text-xl font-semibold mb-4 font-cormorant">
            Shipping Information
          </h3>
          <div className="space-y-4 body-elegant">
            <p>
              We offer complimentary white glove delivery within Colombo city
              limits, which includes expert placement and setup of your
              furniture. For areas outside Colombo, delivery charges will apply
              based on distance and accessibility.
            </p>

            <h4 className="font-semibold font-cormorant">Delivery Timeline:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Colombo: 2-3 business days</li>
              <li>Outside Colombo: 3-7 business days</li>
            </ul>

            <h4 className="font-semibold mt-4 font-cormorant">
              Return Policy:
            </h4>
            <p>
              If you receive damaged or defective items, please contact us
              within 48 hours of delivery for replacement or repair. For special
              order items, please note they are non-returnable unless damaged
              upon delivery.
            </p>

            <h4 className="font-semibold mt-4 font-cormorant">
              Payment Options:
            </h4>
            <p>
              We accept cash payments, bank transfers, and credit cards. For
              most furniture items, a minimum 30% advance payment is required to
              confirm your order, with the balance due upon delivery. Full
              payment options are also available with priority delivery
              benefits.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 font-playfair">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-primary text-white rounded-lg p-8 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-italiana">
          Need Help Choosing the Right Furniture?
        </h2>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto body-elegant">
          Our furniture experts are ready to assist you in finding the perfect
          pieces for your home or office. Contact us for personalized
          recommendations and to schedule a showroom visit.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 font-montserrat"
        >
          <Link href="/contact">Contact Our Design Team</Link>
        </Button>
      </div>
    </div>
  );
}
