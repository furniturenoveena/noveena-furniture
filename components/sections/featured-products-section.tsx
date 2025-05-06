"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";

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

// Sample data for featured products - ideally this would come from a database or API
const featuredProducts = [
  {
    id: 1,
    name: "Elegant Leather Sofa",
    price: 189000,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Living Room",
    type: "Brand New",
    rating: 4.9,
    discountPercentage: 15,
  },
  {
    id: 2,
    name: "Vintage Dining Table",
    price: 156000,
    image:
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image:
      "https://plus.unsplash.com/premium_photo-1680546330888-f995d2d64571?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Living Room",
    type: "Brand New",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Premium Queen Bed",
    price: 220000,
    image:
      "https://images.unsplash.com/photo-1634344656611-0773d8dbbe2c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

export default function FeaturedProductsSection() {
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
            <ProductCard key={product.id} product={product} variants={fadeIn} />
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
  );
}
