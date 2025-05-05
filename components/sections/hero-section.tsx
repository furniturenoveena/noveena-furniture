"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Circle, Star, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  // Setup parallax scrolling effect
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Mouse position tracking for interactive effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setMounted(true);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  // Animation for individual letters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Add scroll indicator variants to prevent initial jump
  const scrollIndicatorVariants = {
    initial: { 
      opacity: 0,
      y: 0 // Start from the correct position
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.8, delay: 1.8 }
      }
    }
  };
  
  // Animation for the scrolling dot to prevent jumps
  const scrollDotVariants = {
    animate: {
      y: [0, 15, 0],
      boxShadow: [
        "0 0 0px rgba(255,255,255,0.5)",
        "0 0 10px rgba(255,255,255,0.8)",
        "0 0 0px rgba(255,255,255,0.5)"
      ],
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        times: [0, 0.5, 1],
        delay: 2 // Delay the animation to prevent initial jump
      }
    }
  };
  
  const title1 = "Elevate Your Space";
  const title2 = "With Timeless Elegance";
  
  // Handle scroll to next section
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  // Enhanced colorful shapes
  const enhancedColors = [
    'from-pink-500 to-purple-600',
    'from-blue-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-green-600',
    'from-violet-500 to-indigo-600',
    'from-rose-400 to-red-600',
    'from-cyan-400 to-blue-600',
    'from-yellow-400 to-amber-600'
  ];
  
  // Add colorful icons to alternate with shapes
  const colorfulIcons = [Star, Triangle, Circle];

  return (
    <section ref={ref} className="relative h-[90vh] flex items-center hero-section overflow-hidden">
      {/* Background to match website color scheme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background/50">
        {mounted && (
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-70"
            style={{
              background: "radial-gradient(circle, rgba(220,53,69,0.15) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)",
              left: 0,
              top: 0,
              translateX: `-50%`,
              translateY: `-50%`
            }}
            animate={{
              x: mousePosition.x * window.innerWidth + window.innerWidth / 2,
              y: mousePosition.y * window.innerHeight + window.innerHeight / 2,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 70
            }}
          />
        )}
        
        {/* Gradient overlays matching primary color */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[70%] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-[100px]" />
            <div className="absolute top-[60%] -right-[20%] w-[60%] h-[70%] bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-[100px]" />
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-[80px]" />
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 opacity-20 rounded-full border border-primary/30"
          style={{
            x: mousePosition.x * (i + 1) * -20,
            y: mousePosition.y * (i + 1) * -20,
            top: `${15 + i * 12}%`,
            left: `${10 + (i * 15) % 70}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Circle className="w-full h-full text-primary" />
        </motion.div>
      ))}

      {/* Colorful geometric shapes matching site colors */}
      {[...Array(6)].map((_, i) => {
        const IconComponent = colorfulIcons[i % colorfulIcons.length];
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-20 h-20 opacity-40 backdrop-blur-md"
            style={{
              top: `${20 + (i * 13)}%`,
              right: `${5 + (i * 7)}%`,
              background: i % 3 === 0 ? 'linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary)/0.7))' : 
                         i % 3 === 1 ? 'linear-gradient(to bottom right, hsl(var(--primary)/0.8), hsl(var(--primary)/0.5))' : 
                         'linear-gradient(to bottom right, hsl(var(--primary)/0.6), hsl(var(--primary)/0.3))',
              filter: i % 2 === 0 ? 'blur(1px)' : 'none',
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '16px' : '0'
            }}
            animate={{
              x: [0, 10 * (i % 2 ? 1 : -1), -5 * (i % 2 ? 1 : -1), 0],
              y: [0, -15, 5, 0],
              rotate: [0, i % 2 ? 15 : -15, i % 2 ? -10 : 10, 0],
              scale: [1, 1.1, 0.95, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {i % 2 === 0 && (
              <IconComponent className="w-full h-full p-4 text-white/60" />
            )}
          </motion.div>
        );
        })}

      {/* Sparkles with primary color */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.7)',
            boxShadow: `0 0 3px hsl(var(--primary)/0.6)`
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Light beams with primary colors */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        <motion.div
          className="absolute w-[60%] h-[25%] bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 blur-[80px]"
          animate={{
            rotate: [0, 180],
            scale: [1, 1.2, 1],
            x: ['-40%', '20%', '-40%'],
            y: ['0%', '50%', '0%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-[40%] h-[35%] bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 blur-[80px]"
          animate={{
            rotate: [180, 0],
            scale: [1.2, 1, 1.2],
            x: ['60%', '20%', '60%'],
            y: ['60%', '20%', '60%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-xl"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-block mb-4 px-4 py-1 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-montserrat text-sm tracking-wider border border-primary/20"
          >
            Redefining Luxury Living
          </motion.span>
          
          {/* Title with site's color scheme */}
          <div className="mb-6">
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-italiana"
            >
              <span className="block overflow-hidden text-foreground">
                {title1.split('').map((char, index) => (
                  <motion.span
                    key={`1-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                    transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden mt-2">
                <motion.span 
                  className="text-primary font-bold inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {title2}
                </motion.span>
              </span>
            </motion.h1>
            <motion.div 
              className="h-[3px] bg-gradient-to-r from-primary via-primary/70 to-primary/50 w-[60%] mt-3"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-black-600 mb-8 body-elegant"
          >
            Discover our premium collection of imported and brand new
            furniture, meticulously curated to transform your home into a
            sanctuary of sophistication and comfort.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Buttons matching website style */}
            <Button 
              asChild 
              size="lg" 
              className="rounded-md group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/category/imported-used">
                <span className="relative z-10">Explore Collection</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 2, 
                    opacity: 0.1,
                    transition: { duration: 0.4 }
                  }} 
                />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-md border-primary/50 text-primary hover:bg-primary/5 group relative overflow-hidden"
            >
              <Link href="/contact">
                <span className="relative z-10">Book Consultation</span>
                <motion.div
                  className="absolute inset-0 bg-primary/5"
                  initial={{ x: '-100%' }}
                  whileHover={{ 
                    x: 0,
                    transition: { duration: 0.3 } 
                  }}
                />
              </Link>
            </Button>
          </motion.div>
          
          {/* Feature badges matching website style */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {[
              { text: 'Premium Quality', color: 'bg-primary/5', dot: 'bg-primary', textColor: 'text-primary' },
              { text: 'Custom Design', color: 'bg-primary/5', dot: 'bg-primary', textColor: 'text-primary' },
              { text: 'Global Selection', color: 'bg-primary/5', dot: 'bg-primary', textColor: 'text-primary' }
            ].map((feature, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + (i * 0.2), duration: 0.5 }}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${feature.color} border border-primary/10 ${feature.textColor}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 15px hsl(var(--primary)/0.2)'
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${feature.dot} mr-2`}></span>
                {feature.text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with primary colors */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to next section"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToNextSection()}
      >
        <motion.div 
          className="text-primary text-sm mb-2 font-montserrat tracking-wider backdrop-blur-sm px-3 py-1 rounded-full bg-primary/5 border border-primary/10"
          animate={{ 
            y: [0, -3, 0],
            boxShadow: [
              "0 0 0px hsl(var(--primary)/0.2)",
              "0 0 10px hsl(var(--primary)/0.5)",
              "0 0 0px hsl(var(--primary)/0.2)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            delay: 2
          }}
        >
          Scroll Down
        </motion.div>
        <div className="w-6 h-10 border-2 border-primary/60 rounded-full flex justify-center relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20 opacity-0"
            whileHover={{ opacity: 1 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            variants={scrollDotVariants}
            animate="animate"
          />
        </div>
      </motion.div>
    </section>
  );
}