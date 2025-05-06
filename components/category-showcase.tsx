"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";

// Define grid item size types with more granular options
type BentoItemSize = "large" | "medium" | "small" | "wide" | "tall" | "tiny";

interface BentoGridConfig {
  sizes: Record<BentoItemSize, string>;
  aspectRatios: Record<BentoItemSize, string>;
}

// Updated bento grid configuration with smaller grid items
const bentoConfig: BentoGridConfig = {
  sizes: {
    large: "md:col-span-5 md:row-span-2", // Slightly smaller large item
    wide: "md:col-span-6 md:row-span-1", // Wide horizontal item
    tall: "md:col-span-3 md:row-span-2", // Narrower tall item
    medium: "md:col-span-3 md:row-span-1", // Smaller medium item
    small: "md:col-span-2 md:row-span-1", // Very small item
    tiny: "md:col-span-2 md:row-span-1", // Tiny item (for dense layouts)
  },
  aspectRatios: {
    large: "aspect-[16/10]", // Slightly shorter
    wide: "aspect-[18/5]", // Wider and shorter
    tall: "aspect-[9/14]", // Less extreme vertical
    medium: "aspect-[4/3]", // Standard
    small: "aspect-[1/1]", // Square
    tiny: "aspect-[3/2]", // Small rectangle
  },
};

// Category interface with required properties
interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  description: string;
  accent: string;
  size: BentoItemSize;
  position?: number; // Optional position in grid for precise layout control
}

// Organized category data with intentional layout
const importedUsedCategories: Category[] = [
  {
    id: 1,
    name: "Living Room",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 42,
    description:
      "Elegant imported living room furniture with character and history",
    accent: "accent-living",
    size: "large",
    position: 1, // Featured item
  },
  {
    id: 2,
    name: "Dining Room",
    image:
      "https://images.unsplash.com/photo-1602872029708-84d970d3382b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 28,
    description: "Classic dining sets that bring sophistication to your meals",
    accent: "accent-dining",
    size: "tall",
    position: 2,
  },
  {
    id: 3,
    name: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 35,
    description: "Premium bedroom furniture for ultimate comfort and style",
    accent: "accent-bedroom",
    size: "medium",
    position: 3,
  },
  {
    id: 4,
    name: "Office",
    image:
      "https://plus.unsplash.com/premium_photo-1670315264879-59cc6b15db5f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 18,
    description: "Professional office furniture with timeless appeal",
    accent: "accent-office",
    size: "medium",
    position: 4,
  },
];

// Map brand new products to bento grid items with proper sizing
const brandNewProducts = products
  .filter((product) => product.type === "Brand New")
  .slice(0, 4)
  .map((product, index) => ({
    ...product,
    // Assign different sizes for visual interest in the bento grid
    size:
      index === 0
        ? ("large" as BentoItemSize)
        : index === 1
        ? ("tall" as BentoItemSize)
        : index === 2
        ? ("medium" as BentoItemSize)
        : ("medium" as BentoItemSize),
    position: index + 1,
  }));

export default function CategoryShowcase() {
  // Animation controls for better sequence control
  const brandNewControlsRef = useRef(null);
  const isBrandNewInView = useInView(brandNewControlsRef, {
    amount: 0.1,
    once: false,
  });
  const brandNewControls = useAnimation();

  // Track if sections have been animated
  const [sectionsAnimated, setSectionsAnimated] = useState({
    importedUsed: false,
    brandNew: false,
  });

  // Trigger animations when sections come into view
  useEffect(() => {
    if (isBrandNewInView && !sectionsAnimated.brandNew) {
      brandNewControls.start("visible");
      setSectionsAnimated((prev) => ({ ...prev, brandNew: true }));
    }
  }, [isBrandNewInView, brandNewControls, sectionsAnimated]);

  // Enhanced animation variants with sequential timing
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.2, // Increased delay for more noticeable sequence
      },
    }),
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-3">
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

        {/* Bento grid layout for categories - smaller grid items */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-16 auto-rows-[minmax(140px,_auto)]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Sort categories by position if available */}
          {importedUsedCategories
            .sort((a, b) => (a.position || 99) - (b.position || 99))
            .map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                type="imported-used"
                config={bentoConfig}
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

        {/* Brand New Section - Uniform grid layout (reverted from bento) */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          ref={brandNewControlsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={brandNewControls}
        >
          {/* No sorting or bento sizing for uniform grid */}
          {brandNewProducts.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              variants={productCardVariants}
              className="opacity-0"
            >
              <ProductCard
                product={{
                  ...product,
                  // Remove bento-specific properties
                  size: undefined,
                  position: undefined,
                }}
                variants={{}}
              />
            </motion.div>
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

// Updated interface with config param
interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
    count: number;
    description: string;
    accent: string;
    size: BentoItemSize;
    position?: number;
  };
  index: number;
  type: string;
  config: BentoGridConfig;
}

function CategoryCard({ category, index, type, config }: CategoryCardProps) {
  const href = `/category/${type}/${category.name
    .toLowerCase()
    .replace(" ", "-")}`;

  // Add refs and hooks for scroll detection
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, {
    once: false,
    amount: 0.2,
    margin: "-100px 0px -100px 0px",
  });

  // Control individual elements with separate animations
  const controls = useAnimation();
  const imageControls = useAnimation();
  const contentControls = useAnimation();

  // Trigger animations when card comes into view while scrolling
  useEffect(() => {
    if (cardInView) {
      // Sequence the animations
      controls.start("visible");
      imageControls.start("visible");

      // Delayed content reveal
      setTimeout(() => {
        contentControls.start("visible");
      }, 300 + index * 100);
    }
  }, [cardInView, controls, imageControls, contentControls, index]);

  // Get grid classes from config
  const gridClass = config.sizes[category.size];
  const aspectClass = config.aspectRatios[category.size];

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      initial="hidden"
      animate={controls}
      className={`group ${gridClass}`}
    >
      <Link href={href} className="h-full block">
        <div
          className={`premium-card overflow-hidden rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-500 relative before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:opacity-0 hover:before:opacity-100 h-full`}
        >
          <div className={`relative h-full overflow-hidden ${aspectClass}`}>
            <motion.div
              initial="hidden"
              animate={imageControls}
              variants={{
                hidden: { scale: 1.2, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: "easeOut",
                  },
                },
              }}
              className="h-full w-full"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={imageControls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 0.8,
                  transition: { duration: 0.8 },
                },
              }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />

            <motion.div
              className="absolute bottom-0 left-0 p-3 w-full"
              initial="hidden"
              animate={contentControls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { width: "0%" },
                  visible: {
                    width: "40%",
                    transition: { duration: 0.5, delay: 0.2 },
                  },
                }}
                className={`h-0.5 bg-primary/80 mb-2 rounded-full`}
              />

              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`text-sm ${
                  category.size === "large"
                    ? "md:text-xl"
                    : category.size === "medium"
                    ? "md:text-lg"
                    : "text-sm"
                } font-bold text-white mb-0.5 font-cormorant ${
                  category.accent
                } group-hover:text-primary/90 transition-colors duration-300`}
              >
                {category.name}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`text-white/80 text-xs ${
                  category.size === "large"
                    ? "md:line-clamp-2"
                    : category.size === "medium" || category.size === "tall"
                    ? "md:line-clamp-2"
                    : "hidden md:block md:line-clamp-1"
                } font-light`}
              >
                {category.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex justify-between items-center mt-1"
              >
                <span className="text-white/90 text-xs px-2 py-0.5 bg-black/30 rounded-full">
                  {category.count}
                </span>
                <span className="text-white flex items-center text-xs font-medium group-hover:underline relative px-2 py-0.5 overflow-hidden rounded-md group-hover:bg-white/10 transition-all duration-300">
                  View
                  <ArrowRight className="ml-1 h-2.5 w-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
