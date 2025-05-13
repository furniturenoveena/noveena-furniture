"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import CategoryShowcase from "@/components/category-showcase";
import FeaturedProductsSection from "@/components/sections/featured-products-section";
import PricingTiersSection from "@/components/sections/pricing-tiers-section";
import AboutSection from "@/components/sections/about-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import VisualizationSection from "@/components/sections/visualization-section";
import CTASection from "@/components/sections/cta-section";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories?includeProducts=true");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?includeCategory=true");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
    setMounted(true);

    const setViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`
      );
    };

    // Initial call to set height
    setViewportHeight();

    // Update on window resize
    window.addEventListener("resize", setViewportHeight);

    // Add styles for proper dimension control
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        width: 100%;
      }
      
      .main-content {
        min-height: var(--viewport-height);
        width: 100%;
        position: relative;
        overflow-x: hidden;
      }
      
      section {
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
      }

      @media (max-width: 640px) {
        section {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up
      window.removeEventListener("resize", setViewportHeight);
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Ensures we only render after client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <div className="pt-16 md:pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Main Categories Showcase */}
      <div className="px-4 sm:px-6 md:px-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <CategoryShowcase
            importedUsedCategories={categories.filter(
              (category) => category.type === "IMPORTED_USED"
            )}
          />
        )}
      </div>

      {/* Featured Products Section */}
      <div className="px-4 sm:px-6 md:px-8">
        {productsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <FeaturedProductsSection products={products} />
        )}
      </div>

      {/* Pricing Tiers Section */}
      <div className="px-4 sm:px-6 md:px-8">
        <PricingTiersSection />
      </div>

      {/* About Section */}
      <div className="px-4 sm:px-6 md:px-8">
        <AboutSection />
      </div>

      {/* Section Divider */}
      <div className="w-full flex justify-center my-8 md:my-16">
        <div className="w-2/3 sm:w-1/2 md:w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Testimonials Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 md:px-8"
      >
        <TestimonialsSection />
      </motion.div>

      {/* Section Divider */}
      <div className="w-full flex justify-center my-8 md:my-16">
        <div className="w-2/3 sm:w-1/2 md:w-1/3 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* 3D Furniture Showcase with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2 }}
        className="relative bg-gradient-to-b from-slate-50 to-white py-8 md:py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <VisualizationSection />
        </div>
      </motion.div>

      {/* CTA Section with enhanced layout */}
      <div className="relative mt-10 md:mt-20 mb-8 md:mb-12">
        <div className="absolute inset-0 bg-gray-50 transform -skew-y-2 z-0"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 py-8 md:py-16"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <CTASection />
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 md:p-3 rounded-full bg-primary/90 text-white shadow-lg hover:bg-primary transition-all"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
