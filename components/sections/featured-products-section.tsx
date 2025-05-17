"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { Product as PrismaProduct, Category } from "@/lib/generated/prisma";

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

// Product card animation variants
const productCardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.2,
    },
  }),
};

interface Product extends PrismaProduct {
  category: Category;
}

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  // Filter products by category type
  const brandNewProducts = products
    .filter((product) => product.category.type === "BRAND_NEW")
    .slice(0, 4);

  const importedUsedProducts = products
    .filter((product) => product.category.type === "IMPORTED_USED")
    .slice(0, 4);

  // Animation controls
  const controls = useAnimation();
  const featuredRef = useRef(null);
  const inView = useInView(featuredRef, { once: true, amount: 0.2 });

  const brandNewControlsRef = useRef(null);
  const isBrandNewInView = useInView(brandNewControlsRef, {
    amount: 0.2,
    once: true,
  });
  const brandNewControls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    if (isBrandNewInView) {
      brandNewControls.start("visible");
    }
  }, [controls, inView, isBrandNewInView, brandNewControls]);

  return (
    <>
      {/* Brand New Products Section */}
      <section className="py-16" ref={brandNewControlsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={brandNewControls}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={brandNewControls}
          >
            {brandNewProducts.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                variants={productCardVariants}
              >
                <ProductCard product={product} variants={{}} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10 mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={brandNewControls}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Imported Used Section */}
      <section className="py-16" ref={featuredRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Premium Pre-Owned Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Imported Used Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
              Discover our curated selection of high-quality imported used
              furniture pieces. Each item has been carefully selected for its
              exceptional craftsmanship, character, and lasting quality at a
              more accessible price point.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
            {importedUsedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variants={fadeIn}
              />
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10 mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-montserrat"
            >
              <Link href="/category/all?type=imported-used">
                View All Imported Used Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
