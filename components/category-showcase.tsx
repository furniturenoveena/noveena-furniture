"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";

// Category data
const importedUsedCategories = [
  {
    id: 1,
    name: "Living Room",
    image: "/placeholder.svg?height=300&width=400",
    count: 42,
    description:
      "Elegant imported living room furniture with character and history",
    accent: "accent-living",
  },
  {
    id: 2,
    name: "Dining Room",
    image: "/placeholder.svg?height=300&width=400",
    count: 28,
    description: "Classic dining sets that bring sophistication to your meals",
    accent: "accent-dining",
  },
  {
    id: 3,
    name: "Bedroom",
    image: "/placeholder.svg?height=300&width=400",
    count: 35,
    description: "Premium bedroom furniture for ultimate comfort and style",
    accent: "accent-bedroom",
  },
  {
    id: 4,
    name: "Office",
    image: "/placeholder.svg?height=300&width=400",
    count: 18,
    description: "Professional office furniture with timeless appeal",
    accent: "accent-office",
  },
];

// Get only the Brand New products for showcase (limited to 4)
const brandNewProducts = products
  .filter((product) => product.type === "Brand New")
  .slice(0, 4);

export default function CategoryShowcase() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Imported Used Section */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
            Premium Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Imported Used Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
            Discover our collection of premium imported furniture with history,
            character, and timeless appeal.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {importedUsedCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              type="imported-used"
            />
          ))}
        </motion.div>

        <div className="text-center mb-16">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-montserrat"
          >
            <Link href="/category/imported-used">
              View All Imported Used Furniture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Brand New Section */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
            Contemporary Designs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Brand New Furniture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
            Explore our latest collection of brand new furniture crafted with
            premium materials and modern sensibility.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {brandNewProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
            />
          ))}
        </motion.div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-montserrat"
          >
            <Link href="/category/brand-new">
              View All Brand New Furniture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
    count: number;
    description: string;
    accent: string;
  };
  index: number;
  type: string;
}

function CategoryCard({ category, index, type }: CategoryCardProps) {
  const href = `/category/${type}/${category.name
    .toLowerCase()
    .replace(" ", "-")}`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
      className="group"
    >
      <Link href={href}>
        <div className="premium-card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3
                className={`text-xl font-bold text-white mb-1 font-cormorant ${category.accent}`}
              >
                {category.name}
              </h3>
              <p className="text-white/80 text-sm mb-2 line-clamp-2">
                {category.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm">
                  {category.count} Items
                </span>
                <span className="text-white flex items-center text-sm font-medium group-hover:underline">
                  View Collection{" "}
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
