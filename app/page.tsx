"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Award,
  ShieldCheck,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import CategoryShowcase from "@/components/category-showcase";
import TestimonialCard from "@/components/testimonial-card";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Elegant Leather Sofa",
    price: 189000,
    image: "/placeholder.svg?height=400&width=600",
    category: "Living Room",
    type: "Brand New",
    rating: 4.9,
    discountPercentage: 15,
  },
  {
    id: 2,
    name: "Vintage Dining Table",
    price: 156000,
    image: "/placeholder.svg?height=400&width=600",
    category: "Dining",
    type: "Imported Used",
    rating: 4.7,
    tieredPricing: [
      { min: 1, max: 1, price: 156000 },
      { min: 2, max: 5, price: 148000 },
      { min: 6, max: 10, price: 140000 },
    ],
  },
  {
    id: 3,
    name: "Modern Coffee Table",
    price: 48000,
    image: "/placeholder.svg?height=400&width=600",
    category: "Living Room",
    type: "Brand New",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Premium Queen Bed",
    price: 220000,
    image: "/placeholder.svg?height=400&width=600",
    category: "Bedroom",
    type: "Imported Used",
    rating: 5.0,
    tieredPricing: [
      { min: 1, max: 1, price: 220000 },
      { min: 2, max: 3, price: 209000 },
      { min: 4, max: 10, price: 198000 },
    ],
  },
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Interior Designer",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The quality of furniture from Noveena is exceptional. My clients always love the premium feel and unique designs. Highly recommended for luxury interiors!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "We purchased our living room set from Noveena and couldn't be happier. The imported pieces have a character and quality that's hard to find elsewhere.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amara Perera",
    role: "Business Owner",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Furnished our entire office with Noveena's collection. Their team was professional and the furniture has held up beautifully over time.",
    rating: 4,
  },
];

export default function Home() {
  // Animation controls
  const controls = useAnimation();
  const featuredRef = useRef(null);
  const inView = useInView(featuredRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center hero-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <span className="inline-block mb-4 px-4 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-white font-montserrat text-sm tracking-wider">
              Redefining Luxury Living
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-italiana">
              Elevate Your Space With Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 body-elegant">
              Discover our premium collection of imported and brand new
              furniture, meticulously curated to transform your home into a
              sanctuary of sophistication and comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-md group">
                <Link href="/category/imported-used">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-md border-white text-white hover:bg-white/20"
              >
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-white text-sm mb-2 font-montserrat tracking-wider">
            Scroll Down
          </div>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex flex-col items-center text-center p-6 premium-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 animate-pulse-subtle">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-cormorant">
                White Glove Delivery
              </h3>
              <p className="text-muted-foreground">
                Complimentary premium delivery service for all furniture within
                Colombo and suburbs, with expert placement and setup.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 premium-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 animate-pulse-subtle">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-cormorant">
                Curated Excellence
              </h3>
              <p className="text-muted-foreground">
                Each piece in our collection is personally selected for
                exceptional quality, craftsmanship, and timeless design.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-6 premium-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 animate-pulse-subtle">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-cormorant">
                Quality Assurance
              </h3>
              <p className="text-muted-foreground">
                Every furniture piece comes with our quality guarantee, ensuring
                lasting beauty and durability for years to come.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Categories Showcase */}
      <CategoryShowcase />

      {/* Featured Products Section */}
      <section className="py-16" ref={featuredRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Handpicked Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Featured Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
              Discover our handpicked selection of premium furniture pieces that
              blend elegance, comfort, and timeless design. Each piece tells a
              unique story.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variants={fadeIn}
              />
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            <Button asChild size="lg" className="font-montserrat">
              <Link href="/category/all">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Flexible Options
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Purchase Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
              We offer flexible payment options and quantity-based pricing to
              accommodate your needs and budget.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="pricing-tier"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">30%</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-cormorant">
                  Advance Payment
                </h3>
                <p className="text-muted-foreground mb-6">
                  Secure your furniture with a 30% advance payment, with the
                  balance due upon delivery.
                </p>
                <ul className="space-y-2 text-left mb-6">
                  {[
                    "Reserve your selected items",
                    "Flexible delivery scheduling",
                    "Balance payment on delivery",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Contact for Details</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="pricing-tier border-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">100%</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-cormorant">
                  Full Payment
                </h3>
                <p className="text-muted-foreground mb-6">
                  Complete your purchase with a full payment and enjoy priority
                  delivery scheduling.
                </p>
                <ul className="space-y-2 text-left mb-6">
                  {[
                    "Priority delivery scheduling",
                    "Complimentary delivery within Colombo",
                    "Extended warranty options",
                    "Exclusive customer support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Contact for Details</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="pricing-tier"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center p-6">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">Bulk</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-cormorant">
                  Quantity Discounts
                </h3>
                <p className="text-muted-foreground mb-6">
                  Enjoy special pricing when purchasing multiple items of the
                  same product.
                </p>
                <ul className="space-y-2 text-left mb-6">
                  {[
                    "Tiered pricing based on quantity",
                    "Ideal for commercial projects",
                    "Custom delivery arrangements",
                    "Dedicated project coordinator",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[400px] md:h-[500px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="About Noveena Furniture"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-32 h-32 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary font-playfair">
                    15+
                  </span>
                  <span className="text-sm text-muted-foreground font-montserrat">
                    Years of Excellence
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                About Noveena Furniture
              </h2>
              <div className="space-y-4 text-muted-foreground body-elegant">
                <p>
                  At Noveena Furniture, we are passionate about bringing
                  exceptional furniture pieces to discerning clients. Formerly
                  known as homestar.lk, we have rebranded to better reflect our
                  commitment to luxury and quality.
                </p>
                <p>
                  Our collection features both imported used furniture with
                  character and history, as well as brand new pieces designed
                  with contemporary aesthetics. Each item is carefully selected
                  to ensure the highest standards of craftsmanship and design.
                </p>
                <p>
                  With years of experience in the furniture industry, we
                  understand the importance of creating spaces that reflect
                  personal style while providing comfort and functionality.
                </p>
              </div>
              <Button asChild className="mt-8 group">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Client Experiences
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
              Hear from our satisfied customers about their experience with
              Noveena Furniture and how our pieces have transformed their
              spaces.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-muted-foreground">
                Overall Customer Rating:
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on 120+ verified customer reviews
            </p>
          </div>
        </div>
      </section>

      {/* 3D Furniture Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Interactive Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Visualize Your Space
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
              Explore our furniture in 3D and visualize how our pieces will look
              in your space before making a purchase.
            </p>
          </motion.div>

          <div className="bg-muted/30 rounded-xl p-8 flex flex-col items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="mb-4 animate-float">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="3D Model"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 font-cormorant">
                3D Furniture Visualization
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our 3D visualization tool allows you to see how our furniture
                will fit in your space. Visit our showroom for a full
                interactive experience.
              </p>
              <Button asChild>
                <Link href="/contact">Book Showroom Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-italiana">
              Transform Your Space Today
            </h2>
            <p className="text-lg mb-8 opacity-90 body-elegant">
              Visit our showroom or contact us to discover how Noveena Furniture
              can help you create the perfect living environment with our
              premium collection of imported and brand new furniture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 font-montserrat"
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white hover:bg-white/20 font-montserrat"
              >
                <Link href="/category/all">Browse Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
