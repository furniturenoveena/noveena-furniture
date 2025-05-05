"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Square, MoveDown, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisualizationSection() {
  // Refs for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const rotateModel = useTransform(scrollYProgress, [0.3, 0.7], [0, 360]);
  const scaleModel = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0.8, 1.1, 1.1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/10 z-0"></div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-[5%] w-64 h-64 rounded-full border border-primary/10 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-10 left-[10%] w-80 h-80 rounded-full border border-primary/20 opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="text-primary font-montserrat text-sm tracking-wider uppercase bg-primary/5 px-4 py-2 rounded-full inline-block mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Interactive Experience
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Visualize Your Space
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-primary/30 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          ></motion.div>
          
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our furniture in 3D and visualize how our pieces will look
            in your space before making a purchase.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Interactive 3D Model Showcase */}
          <motion.div
            className="relative bg-gradient-to-br from-primary/10 to-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10 h-[400px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden"
            variants={itemVariants}
          >
            {/* 3D Model */}
            <motion.div 
              className="relative mb-8"
              style={{ 
                rotate: rotateModel,
                scale: scaleModel,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 p-4 bg-primary/5 backdrop-blur-sm rounded-xl border border-primary/20 shadow-inner">
                <Square size={120} className="text-primary opacity-90" />
              </div>
              
              {/* Orbit rings animation */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-primary/30 rounded-full opacity-60 z-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-primary/20 rounded-full opacity-40 z-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold mb-3 font-cormorant text-center"
              variants={itemVariants}
            >
              Interactive 3D Furniture Models
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-6 text-center max-w-md"
              variants={itemVariants}
            >
              Rotate, zoom and place virtual furniture in your space with our advanced 
              3D visualization tool. Experience the future of furniture shopping.
            </motion.p>
            
            {/* Interactive hint */}
            <motion.div 
              className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5 
              }}
            >
              <MoveDown size={14} /> 
              <span>Scroll to interact</span>
            </motion.div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {[
              {
                title: "Augmented Reality View",
                description: "Use your phone camera to see how our furniture looks in your actual space",
                icon: <Phone className="h-6 w-6" />,
                color: "from-violet-500/10 to-violet-500/5"
              },
              {
                title: "Room Planning Tool",
                description: "Design your entire room with our digital planning tool and expert assistance",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>,
                color: "from-blue-500/10 to-blue-500/5"
              },
              {
                title: "Virtual Showroom Tours",
                description: "Explore our showroom virtually before visiting in person",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
                color: "from-amber-500/10 to-amber-500/5"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="group relative bg-card backdrop-blur-sm border border-muted/40 rounded-xl p-5 hover:border-primary/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                custom={index}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-primary/10 rounded-lg p-2 text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 font-cormorant">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-primary/10 rounded-br-lg opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div 
              className="mt-8 flex justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button 
                asChild 
                className="px-8 group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Link href="/contact" className="flex items-center">
                  Book Showroom Visit
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 transform -skew-x-30 -translate-x-full animate-shimmer"></span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}