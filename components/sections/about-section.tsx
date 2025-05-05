"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="About Noveena Furniture"
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-32 h-32 flex items-center justify-center">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary font-playfair">
                  15+
                </span>
                <span className="text-sm text-muted-foreground font-montserrat">
                  Years of Excellence
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary font-montserrat text-sm tracking-wider uppercase">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              About Noveena Furniture
            </h2>
            <div className="space-y-4 text-muted-foreground body-elegant">
              <p>
                At Noveena Furniture, we are passionate about bringing
                exceptional furniture pieces to discerning clients. Formerly
                known as homestar.lk, we have rebranded to better reflect our
                commitment to luxury and quality.
              </p>
              <p>
                Our collection features both imported used furniture with
                character and history, as well as brand new pieces designed
                with contemporary aesthetics. Each item is carefully selected
                to ensure the highest standards of craftsmanship and design.
              </p>
              <p>
                With years of experience in the furniture industry, we
                understand the importance of creating spaces that reflect
                personal style while providing comfort and functionality.
              </p>
              
              <motion.div 
                className="pt-4 grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              >
                {[
                  "Quality Craftsmanship", 
                  "Sustainable Materials",
                  "Unique Designs", 
                  "Customer Satisfaction"
                ].map((value, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center group relative overflow-hidden rounded-md px-3 py-2 bg-gradient-to-r from-white/20 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 12,
                        delay: index * 0.15 
                      }
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transition: { duration: 0.2 }
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    
                    <div className="relative mr-3 flex-shrink-0">
                      <div className="h-2 w-2 bg-primary rounded-full relative z-10"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 border border-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 transition-all duration-700"></div>
                    </div>
                    
                    <span className="text-sm font-medium relative z-10 tracking-wide group-hover:tracking-wider transition-all duration-500">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10"
            >
              <div className="relative inline-flex group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary opacity-75 rounded-lg blur group-hover:opacity-100 transition-all duration-500"></div>
                <Button 
                  asChild 
                  className="relative bg-background border-0 px-5 py-6 rounded-md group-hover:bg-background/95 text-primary group-hover:text-primary transition-colors duration-500"
                >
                  <Link href="/about" className="flex items-center z-10 relative">
                    <span className="relative z-10 mr-1 group-hover:mr-3 transition-all duration-300">Learn More About Us</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100" />
                    
                    <span className="absolute top-0 right-full w-12 h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transform translate-x-0 skew-x-[45deg] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></span>
                    <span className="absolute top-0 right-full w-12 h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transform translate-x-0 skew-x-[45deg] group-hover:translate-x-[400%] transition-transform duration-1000 delay-150 ease-out"></span>
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 flex items-center">
                <div className="h-[1px] w-16 bg-gradient-to-r from-primary/50 to-transparent"></div>
                <span className="text-xs text-muted-foreground ml-2 italic font-serif">Crafting elegance since 2008</span>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="absolute -z-10 opacity-5 w-64 h-64 rounded-full bg-primary/30 blur-3xl top-1/2 left-0 transform -translate-x-1/2"></div>
          <div className="absolute -z-10 opacity-5 w-96 h-96 rounded-full bg-primary/20 blur-3xl bottom-0 right-0 transform translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
}