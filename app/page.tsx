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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Instead of hiding scrollbar, set proper viewport dimensions
    const setViewportHeight = () => {
      // Set a CSS variable for the viewport height
      document.documentElement.style.setProperty(
        '--viewport-height', 
        `${window.innerHeight}px`
      );
    };
    
    // Initial call to set height
    setViewportHeight();
    
    // Update on window resize
    window.addEventListener('resize', setViewportHeight);
    
    // Add styles for proper dimension control
    const style = document.createElement('style');
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
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up
      window.removeEventListener('resize', setViewportHeight);
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
    <div className="pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Main Categories Showcase */}
      <CategoryShowcase />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Pricing Tiers Section */}
      <PricingTiersSection />

      {/* About Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* 3D Furniture Showcase */}
      <VisualizationSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
