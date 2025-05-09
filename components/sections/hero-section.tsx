"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Circle, Star, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  // Setup parallax scrolling effect
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse position tracking for interactive effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    setMounted(true);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Animation for individual letters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Add scroll indicator variants to prevent initial jump
  const scrollIndicatorVariants = {
    initial: {
      opacity: 0,
      y: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.8, delay: 1.8 },
      },
    },
  };

  // Animation for the scrolling dot to prevent jumps
  const scrollDotVariants = {
    animate: {
      y: [0, 15, 0],
      boxShadow: [
        "0 0 0px rgba(255,255,255,0.5)",
        "0 0 10px rgba(255,255,255,0.8)",
        "0 0 0px rgba(255,255,255,0.5)",
      ],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        times: [0, 0.5, 1],
        delay: 2,
      },
    },
  };

  const title1 = "Elevate Your Space";
  const title2 = "With Timeless Elegance";

  // Handle scroll to next section
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Enhanced colorful shapes
  const enhancedColors = [
    "from-pink-500 to-purple-600",
    "from-blue-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-green-600",
    "from-violet-500 to-indigo-600",
    "from-rose-400 to-red-600",
    "from-cyan-400 to-blue-600",
    "from-yellow-400 to-amber-600",
  ];

  // Add colorful icons to alternate with shapes
  const colorfulIcons = [Star, Triangle, Circle];

  return (
    <section
      ref={ref}
      className="relative h-[100vh] sm:h-[90vh] flex items-center hero-section overflow-hidden"
    >
      {/* Enhanced background with layered gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background/50">
        {/* First layer - animated gradient orb */}
        {mounted && (
          <motion.div
            className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(220,53,69,0.15) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)",
              left: 0,
              top: 0,
              translateX: `-50%`,
              translateY: `-50%`,
            }}
            animate={{
              x:
                mousePosition.x * Math.min(window.innerWidth * 0.8, 500) +
                window.innerWidth / 2,
              y:
                mousePosition.y * Math.min(window.innerHeight * 0.8, 500) +
                window.innerHeight / 2,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 70,
            }}
          />
        )}

        {/* Enhanced hero image with LARGER mobile sizing */}
        <motion.div
          className="absolute z-5 
            left-1/2 -translate-x-1/2 top-0 w-full h-[65%] 
            sm:left-auto sm:transform-none sm:right-0 sm:top-[20%] sm:h-[75%] sm:w-[90%]
            md:top-[10%] md:h-[85%] md:w-[85%]
            lg:top-0 lg:h-[100%] lg:w-[75%]
            xl:max-w-[1600px]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          style={{
            y: mousePosition.y * (window.innerWidth < 640 ? -5 : -15),
            x: mousePosition.x * (window.innerWidth < 640 ? -5 : -10),
            maxWidth: "100%",
            right: window.innerWidth >= 640 ? 0 : undefined,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="https://res.cloudinary.com/do08c2xq5/image/upload/v1746523757/ChatGPT_Image_May_6_2025_02_55_39_PM_bial9q.png"
              alt="Luxurious furniture showcase"
              fill
              style={{
                objectFit: "contain",
                objectPosition:
                  window.innerWidth < 640 ? "center center" : "center right",
                maxWidth: "100%",
              }}
              priority
              className="drop-shadow-2xl opacity-80 sm:opacity-80 md:opacity-90 lg:opacity-100 
                         saturate-[1.05] brightness-[1.02]"
            />
            {/* Enhanced glow effect with multi-layered gradients */}
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-primary/5 to-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-primary/3 to-transparent rounded-full blur-[100px] -z-20 opacity-30"></div>
          </div>
        </motion.div>

        {/* Enhanced gradient overlays with better overflow control */}
        <div className="absolute inset-0 opacity-70 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div
              className="absolute transform translate-x-[-20%] translate-y-[-40%] w-[80%] h-[70%] 
                         bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-[100px]"
            />
            <div
              className="absolute top-[60%] transform translate-x-[20%] w-[60%] h-[70%] 
                         bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-[100px]"
            />
            <div
              className="absolute top-[20%] right-[10%] w-[40%] h-[40%] 
                         bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Fewer decorative elements on mobile */}
      {[...Array(window.innerWidth < 640 ? 2 : 6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 sm:w-7 md:w-8 h-4 sm:h-7 md:h-8 opacity-20 rounded-full border border-primary/30"
          style={{
            x:
              mousePosition.x * (i + 1) * (window.innerWidth < 640 ? -5 : -20),
            y:
              mousePosition.y * (i + 1) * (window.innerWidth < 640 ? -5 : -20),
            top: `${15 + i * (window.innerWidth < 640 ? 16 : 12)}%`,
            left: `${
              10 +
              ((i * (window.innerWidth < 640 ? 18 : 15)) %
                (window.innerWidth < 640 ? 80 : 70))
            }%`,
            boxShadow:
              i % 2 === 0 ? "0 0 15px hsl(var(--primary)/0.1)" : "none",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Circle className="w-full h-full text-primary" />
        </motion.div>
      ))}

      {/* Fewer colorful geometric shapes on mobile */}
      {[...Array(window.innerWidth < 640 ? 2 : 6)].map((_, i) => {
        const IconComponent = colorfulIcons[i % colorfulIcons.length];
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-12 sm:w-18 md:w-20 h-12 sm:h-18 md:h-20 opacity-30 sm:opacity-40 backdrop-blur-md"
            style={{
              top: `${20 + i * (window.innerWidth < 640 ? 18 : 13)}%`,
              right: `${5 + i * (window.innerWidth < 640 ? 10 : 7)}%`,
              background:
                i % 3 === 0
                  ? "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary)/0.7))"
                  : i % 3 === 1
                  ? "linear-gradient(to bottom right, hsl(var(--primary)/0.8), hsl(var(--primary)/0.5))"
                  : "linear-gradient(to bottom right, hsl(var(--primary)/0.6), hsl(var(--primary)/0.3))",
              filter: i % 2 === 0 ? "blur(1px)" : "none",
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "16px" : "0",
              boxShadow:
                i % 3 === 0 ? "0 0 25px hsl(var(--primary)/0.15)" : "none",
            }}
            animate={{
              x: [
                0,
                10 * (i % 2 ? 1 : -1) * (window.innerWidth < 640 ? 0.5 : 1),
                -5 * (i % 2 ? 1 : -1) * (window.innerWidth < 640 ? 0.5 : 1),
                0,
              ],
              y: [
                0,
                -15 * (window.innerWidth < 640 ? 0.5 : 1),
                5 * (window.innerWidth < 640 ? 0.5 : 1),
                0,
              ],
              rotate: [0, i % 2 ? 15 : -15, i % 2 ? -10 : 10, 0],
              scale: [1, 1.1, 0.95, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: (10 + i * 3) * (window.innerWidth < 640 ? 1.5 : 1),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {i % 2 === 0 && (
              <IconComponent className="w-full h-full p-4 text-white/70" />
            )}
          </motion.div>
        );
      })}

      {/* Mobile-optimized centered content container with LARGER title */}
      <div className="container mx-auto px-5 sm:px-6 md:px-8 z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-xl pt-20 sm:pt-0 mx-auto sm:mx-0 text-center sm:text-left"
        >
          {/* Simplified badge for mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <span className="px-2 sm:px-4 py-1 sm:py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-montserrat text-sm sm:text-sm tracking-wider border border-primary/20 inline-flex items-center">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary mr-1.5 sm:mr-2 animate-pulse"></span>
              <span className="hidden sm:inline">Redefining </span>Luxury Living
            </span>
          </motion.div>

          {/* LARGER title for mobile */}
          <div className="mb-4 sm:mb-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] sm:leading-tight font-italiana"
            >
              <span className="block text-foreground">{title1}</span>
              <span className="block mt-1 sm:mt-2 text-primary">{title2}</span>
            </motion.h1>

            {/* Wider divider for mobile */}
            <motion.div
              className="h-[2px] sm:h-[3px] bg-gradient-to-r from-primary via-primary/70 to-primary/30 w-[70%] mt-3 mx-auto sm:mx-0"
              initial={{ width: 0, opacity: 0.5 }}
              animate={{ width: "70%", opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </div>

          {/* Shorter description for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-base sm:text-base md:text-lg text-foreground/90 dark:text-foreground/90 mb-5 sm:mb-6 font-light leading-relaxed mx-auto sm:mx-0 max-w-[85%] sm:max-w-full mx-auto"
          >
            <span className="hidden sm:inline">
              Discover our premium collection of imported and brand new
              furniture,{" "}
            </span>
            <span>
              Transform your home into a sanctuary of sophistication and
              comfort.
            </span>
          </motion.p>

          {/* Centered buttons for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-row sm:flex-row gap-3 justify-center sm:justify-start"
          >
            {/* Primary button */}
            <Button
              asChild
              size="default"
              className="rounded-md group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow sm:size-lg text-base sm:text-base"
            >
              <Link href="/category/all">
                <span className="relative z-10">Explore</span>
                <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-4 sm:w-4 transition-all duration-300 group-hover:translate-x-1 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{
                    scale: 2.5,
                    opacity: 0.15,
                    transition: { duration: 0.4 },
                  }}
                />
              </Link>
            </Button>

            {/* Secondary button */}
            <Button
              asChild
              variant="outline"
              size="default"
              className="rounded-md border-primary/60 text-primary hover:bg-primary/5 group relative overflow-hidden shadow-sm hover:shadow-md transition-all sm:size-lg text-base sm:text-base"
            >
              <Link href="/contact">
                <span className="relative z-10">Contact</span>
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: 0,
                    transition: { duration: 0.3 },
                  }}
                />
              </Link>
            </Button>
          </motion.div>

          {/* Feature badges - hidden on smallest screens, visible on larger mobile and desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="hidden sm:flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 justify-center sm:justify-start"
          >
            {[{
                text: "Premium Quality",
                color: "bg-primary/10",
                dot: "bg-primary",
                textColor: "text-primary",
              },
              {
                text: "Custom Design",
                color: "bg-primary/10",
                dot: "bg-primary",
                textColor: "text-primary",
              },
              {
                text: "Global Selection",
                color: "bg-primary/10",
                dot: "bg-primary",
                textColor: "text-primary",
              },
            ].map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.2, duration: 0.5 }}
                className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs ${feature.color} backdrop-blur-sm border border-primary/20 ${feature.textColor}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px hsl(var(--primary)/0.2)",
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${feature.dot} mr-2`}
                ></span>
                {feature.text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified scroll indicator for mobile */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToNextSection()}
      >
        <motion.div
          className="text-primary text-sm sm:text-sm mb-1 sm:mb-1.5 font-montserrat tracking-wider backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 border border-primary/20"
          animate={{
            y: [0, -3, 0],
            boxShadow: [
              "0 0 0px hsl(var(--primary)/0.2)",
              "0 0 10px hsl(var(--primary)/0.5)",
              "0 0 0px hsl(var(--primary)/0.2)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: 2,
          }}
        >
          Scroll
        </motion.div>
        <div className="w-4 sm:w-5 h-6 sm:h-8 border-2 border-primary/60 rounded-full flex justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20 opacity-0"
            whileHover={{ opacity: 1 }}
          />
          <motion.div
            className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary rounded-full mt-2"
            variants={scrollDotVariants}
            animate="animate"
          />
        </div>
      </motion.div>
    </section>
  );
}
