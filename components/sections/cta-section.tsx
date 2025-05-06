"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  // Animation variants for elements
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const drawPathVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background/90 z-0"></div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full opacity-10"
        >
          <motion.circle
            cx="500"
            cy="500"
            r="350"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5,10"
            className="text-primary"
            variants={drawPathVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5 }}
          />
          <motion.path
            d="M200,500 Q500,200 800,500 T1200,500"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary/40"
            variants={drawPathVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.8 }}
          />
          <motion.path
            d="M200,600 Q500,900 800,600 T1200,600"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary/30"
            variants={drawPathVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 2 }}
          />
        </motion.svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="text-primary font-montserrat text-sm tracking-wider uppercase bg-primary/5 px-4 py-2 rounded-full inline-block mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Ready to Transform Your Space?
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Elevate Your Home with Noveena Luxury Furniture
              </motion.h2>

              <motion.div
                className="w-32 h-1 bg-primary/30 mb-6"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 128, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>

              <motion.p
                className="text-muted-foreground text-lg mb-8 max-w-lg body-elegant"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Discover our exquisite collection of furniture crafted with
                precision and designed to transform your living spaces into a
                statement of elegance and luxury.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                >
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center group-hover:text-primary">
                      Request Consultation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  <Link href="/category/all" className="flex items-center">
                    View Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="mt-8 pt-8 border-t border-muted/30 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="relative h-10 w-10 rounded-full border-2 border-background overflow-hidden"
                      initial={{ opacity: 0, x: -10 * i }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    >
                      <Image
                        src={`https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid&w=740`}
                        alt={`Customer ${i}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="font-bold text-sm">
                    100+ Satisfied Clients
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Join our satisfied customers
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={scaleInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Parallax hover effect */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1615471618985-97108e2ba478?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Luxury Furniture"
                  fill
                  className="object-cover transform transition-transform duration-10000 ease-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white bg-gradient-to-t from-black/60 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <motion.span
                  className="bg-primary/80 text-white text-sm font-medium px-4 py-1 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                >
                  Featured Collection
                </motion.span>
                <motion.h3
                  className="text-2xl font-bold mt-3 font-playfair"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  Elegance Series
                </motion.h3>
                <motion.p
                  className="mt-2 text-sm text-white/80"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                >
                  Our most popular luxury furniture collection
                </motion.p>
              </motion.div>

              {/* Corner decorations */}
              <motion.div
                className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/40 rounded-tr-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/40 rounded-bl-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.7 }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
