"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  // Handle visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * 0.3) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Set up event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        transition: { duration: 0.5 }
      }}
    >
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-transparent to-primary/80"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
      
      <motion.div 
        className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-primary/20 shadow-lg flex flex-col items-center pointer-events-auto"
        whileHover={{ scale: 1.05 }}
      >
        <motion.span
          className="text-xs uppercase tracking-widest text-primary mb-1 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Scroll
        </motion.span>
        
        <motion.div
          className="text-primary"
          animate={{
            y: [0, 5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}