"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Define interface for pricing tier
interface PricingTier {
  name: string;
  icon: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  popular: boolean;
  accentColor: string;
  iconBg: string;
  iconColor: string;
  badge: string;
}

export default function PricingTiersSection() {
  // State to track window width for responsive design
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pricing tier cards data for reuse
  const pricingTiers = [
    {
      name: "Advance Payment",
      icon: "30%",  // Changed from emoji to text
      description: "Secure your furniture with a 30% advance payment, with the balance due upon delivery.",
      features: [
        "Reserve your selected items",
        "Flexible delivery scheduling",
        "Balance payment on delivery",
      ],
      buttonText: "Contact for Details",
      buttonVariant: "outline" as "outline",
      popular: false,
      accentColor: "emerald",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badge: ""
    },
    {
      name: "Full Payment",
      icon: "100%",  // Changed from emoji to text
      description: "Complete your purchase with a full payment and enjoy VIP delivery scheduling and exclusive benefits.",
      features: [
        "Priority delivery scheduling",
        "Complimentary delivery within Colombo",
        "Extended warranty options",
        "Exclusive customer support",
        "Complementary interior styling consultation"
      ],
      buttonText: "Choose Full Payment",
      buttonVariant: "default" as "default",
      popular: true,
      accentColor: "violet",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      badge: "Recommended"
    },
    {
      name: "Quantity Discounts",
      icon: "BULK",  // Changed from emoji to text
      description: "Perfect for projects and businesses - unlock special bulk pricing with significant savings on multiple items.",
      features: [
        "Progressive discounts based on quantity",
        "Ideal for commercial projects",
        "Custom delivery arrangements",
        "Dedicated project coordinator",
      ],
      buttonText: "Request Quote",
      buttonVariant: "outline" as "outline",
      popular: false,
      accentColor: "amber",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badge: ""
    }
  ];

  // Render pricing tier card (used both in grid and swiper)
  const renderPricingCard = (tier: PricingTier, index: number) => {
    // Dynamic classes based on theme
    const cardBgClass = theme === 'dark' ? 'bg-card' : 'bg-white';
    const cardHoverClass = theme === 'dark' ? 'hover:bg-card/80' : 'hover:bg-white';
    
    // Adjust icon backgrounds and colors for dark mode
    const iconBgClass = theme === 'dark'
      ? tier.iconBg.replace('bg-', 'bg-opacity-20 bg-')
      : tier.iconBg;
    
    return (
      <motion.div
        key={tier.name}
        className={`pricing-tier relative ${cardBgClass} rounded-xl shadow-lg ${
          tier.popular 
            ? `shadow-2xl border-2 border-primary/30 z-10 ${theme === 'dark' ? 'shadow-primary/10' : ''}` 
            : `border ${theme === 'dark' ? 'border-border' : 'border-muted/40'}`
        } overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${
          tier.popular ? 'scale-105' : ''
        } h-full`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {tier.badge && (
          <div className="absolute top-2 inset-x-0 flex justify-center">
            <div className={`bg-primary px-6 py-2 rounded-full text-sm font-medium shadow-lg transform-gpu group-hover:scale-105 transition-transform duration-300 text-primary-foreground`}>
              {tier.badge}
            </div>
          </div>
        )}

        <div className={`text-center p-8 ${tier.popular ? 'pt-12' : ''} relative z-10 h-full flex flex-col`}>
          <div className={`h-20 w-auto px-4 ${iconBgClass} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-primary' : tier.iconColor} uppercase tracking-wide`}>{tier.icon}</span>
          </div>
          <h3 className={`text-2xl font-bold mb-3 font-cormorant text-primary${tier.popular ? '' : '/90'} group-hover:text-primary transition-colors duration-300`}>
            {tier.name}
          </h3>
          <div className="w-16 h-[1px] bg-primary/30 mx-auto mb-4"></div>
          <p className="text-muted-foreground mb-8">
            {tier.description}
          </p>
          <ul className="space-y-3 text-left mb-8 flex-grow">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <div className={`h-6 w-6 rounded-full ${iconBgClass} flex items-center justify-center mr-3 flex-shrink-0`}>
                  <Check className={`h-3.5 w-3.5 ${theme === 'dark' ? 'text-primary' : tier.iconColor}`} />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            asChild 
            variant={tier.buttonVariant}
            className={`w-full ${tier.buttonVariant === "outline" 
              ? "border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground hover:border-primary/90" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"} 
              transition-all duration-300 font-montserrat mt-auto relative overflow-hidden group`}
          >
            <Link href="/contact" className="flex items-center justify-center">
              {tier.buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 w-full h-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></span>
            </Link>
          </Button>
          
          {tier.popular && (
            <>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  // Sort the pricing tiers for mobile view to show popular one first
  const sortedForMobile = [...pricingTiers].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-background/80 z-0"></div>
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-10 left-[10%] w-40 h-40 border border-primary/30 rounded-full"></div>
        <div className="absolute bottom-20 right-[15%] w-60 h-60 border border-primary/20 rounded-full"></div>
        <div className="absolute top-40 right-[20%] w-20 h-20 border border-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-montserrat text-sm tracking-wider uppercase bg-primary/5 px-4 py-2 rounded-full">
            Flexible Purchase Options
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-playfair">
            Tailored Payment Solutions
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
            We believe in making luxury accessible with flexible payment options 
            and quantity-based pricing tailored to your needs and budget.
          </p>
        </motion.div>

        {/* Conditional rendering based on screen size */}
        {isMobile ? (
          <div className="pb-12">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              initialSlide={sortedForMobile.findIndex(tier => tier.popular)} // Start with popular tier
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-primary',
              }}
              className="pricing-swiper py-8 px-4"
            >
              {sortedForMobile.map((tier, index) => (
                <SwiperSlide key={tier.name} className="pb-12">
                  {renderPricingCard(tier, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 xl:gap-10 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => renderPricingCard(tier, index))}
          </div>
        )}

        {/* Added section for financing options */}
        <motion.div
          className={`mt-16 max-w-3xl mx-auto text-center ${theme === 'dark' ? 'bg-card/60' : 'bg-white/50'} backdrop-blur-sm p-6 rounded-xl border ${theme === 'dark' ? 'border-border' : 'border-muted/40'} shadow-md`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-cormorant font-bold mb-3 text-foreground">Need Financing Options?</h3>
          <p className="text-muted-foreground mb-4">
            We also offer flexible financing solutions through our banking partners to help make your luxury furniture more accessible.
          </p>
          <Button 
            asChild 
            variant="ghost" 
            className="text-primary hover:text-primary/90 hover:bg-primary/5"
          >
            <Link href="/financing">Learn About Financing Options <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}