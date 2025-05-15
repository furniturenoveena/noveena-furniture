"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category as PrismaCategory, Product } from "@/lib/generated/prisma";

// Define grid item size types with more granular options
type BentoItemSize = "large" | "medium" | "small" | "wide" | "tall" | "tiny";

interface BentoGridConfig {
  sizes: Record<BentoItemSize, string>;
  aspectRatios: Record<BentoItemSize, string>;
}

// Updated bento grid configuration with bigger grid items
const bentoConfig: BentoGridConfig = {
  sizes: {
    large: "md:col-span-5 md:row-span-2", // Wider but shorter
    wide: "md:col-span-8 md:row-span-1", // Extra wide horizontal item
    tall: "md:col-span-3 md:row-span-2", // Narrower but still tall
    medium: "md:col-span-4 md:row-span-1", // Smaller but wider aspect
    small: "md:col-span-2 md:row-span-1", // Smaller width
    tiny: "md:col-span-2 md:row-span-1", // Tiny item (unchanged)
  },
  aspectRatios: {
    large: "aspect-[16/8]", // Wider, less tall
    wide: "aspect-[20/5]", // Extra wide panoramic
    tall: "aspect-[12/16]", // Less tall, bit wider proportionally
    medium: "aspect-[4/3]", // Wider aspect ratio
    small: "aspect-[4/3]", // Wider than square
    tiny: "aspect-[3/2]", // Small rectangle (unchanged)
  },
};

interface Category extends PrismaCategory {
  products: Product[];
  _count: { products: number };
}

// Define component props interface
interface CategoryShowcaseProps {
  importedUsedCategories: Category[];
}

export default function CategoryShowcase({
  importedUsedCategories,
}: CategoryShowcaseProps) {
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

  // Function to determine size based on index
  const getSizeByIndex = (index: number): BentoItemSize => {
    if (index === 0) return "large";
    if (index === 1) return "tall";
    if (index === 2 || index === 3) return "medium";
    return "small"; // Default size for remaining categories (3 in a row)
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

        {/* Bento grid layout - centered with justified content */}
        <div className="flex justify-center w-full">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-16 auto-rows-[minmax(140px,_auto)] w-full max-w-7xl"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Map categories with dynamic sizing based on index */}
            {importedUsedCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                type="imported-used"
                config={bentoConfig}
                size={getSizeByIndex(index)}
              />
            ))}
          </motion.div>
        </div>

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
      </div>
    </section>
  );
}

// Updated interface with size param instead of category containing size
interface CategoryCardProps {
  category: Category & { _count: { products: number } };
  index: number;
  type: string;
  config: BentoGridConfig;
  size: BentoItemSize; // Size is now passed as a prop instead of from category
}

function CategoryCard({
  category,
  index,
  type,
  config,
  size,
}: CategoryCardProps) {
  const href = `/category/${type}?category=${category.name
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

  // Get grid classes from config using the passed size prop
  const gridClass = config.sizes[size];
  const aspectClass = config.aspectRatios[size];

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
              className={`absolute bottom-0 left-0 p-4 md:p-5 w-full ${
                size === "tall" ? "h-full flex flex-col justify-end" : ""
              }`}
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
                className={`h-0.5 bg-primary/80 ${
                  size === "tall" ? "mb-2" : "mb-3"
                } rounded-full`}
              />

              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`${
                  size === "large"
                    ? "text-lg md:text-2xl"
                    : size === "medium"
                    ? "text-base md:text-xl"
                    : size === "tall"
                    ? "text-sm md:text-lg"
                    : "text-sm md:text-lg"
                } font-bold text-white ${
                  size === "tall" ? "mb-0.5" : "mb-1"
                } font-cormorant group-hover:text-white transition-colors duration-300`}
              >
                {category.name}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`text-white/80 ${
                  size === "large"
                    ? "text-sm md:text-base md:line-clamp-2"
                    : size === "medium"
                    ? "text-xs md:text-sm md:line-clamp-2"
                    : size === "tall"
                    ? "text-xs md:text-xs line-clamp-2 md:line-clamp-2"
                    : "text-xs hidden md:block md:line-clamp-1"
                } font-light`}
              >
                {category.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`flex justify-between items-center ${
                  size === "tall" ? "mt-1.5" : "mt-2"
                }`}
              >
                <span
                  className={`text-white/90 ${
                    size === "tall" ? "text-xs" : "text-xs md:text-sm"
                  } px-2 py-0.5 bg-black/30 rounded-full`}
                >
                  {category._count.products}
                </span>
                <span
                  className={`text-white flex items-center ${
                    size === "tall" ? "text-xs" : "text-xs md:text-sm"
                  } font-medium group-hover:underline relative px-2 py-0.5 overflow-hidden rounded-md group-hover:bg-white/10 transition-all duration-300`}
                >
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
