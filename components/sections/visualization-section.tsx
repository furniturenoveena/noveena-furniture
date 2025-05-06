"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Store,
  MoveDown,
  ArrowRight,
  Users,
  Palette,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VisualizationSection() {
  // Refs for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateModel = useTransform(scrollYProgress, [0.3, 0.7], [0, 360]);
  const scaleModel = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.7, 0.8],
    [0.8, 1.1, 1.1, 0.9]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
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
            Visit In Person
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience Our Showroom
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
            Touch, feel, and see the quality of our furniture in person. Our
            welcoming showroom offers a curated selection of our finest pieces
            in stylish room settings.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Showroom Showcase */}
          <motion.div
            className="relative bg-gradient-to-br from-primary/10 to-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10 h-[400px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden"
            variants={itemVariants}
          >
            {/* Showroom Icon */}
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
                <Store size={120} className="text-primary opacity-90" />
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
              Visit Us Today
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-6 text-center max-w-md"
              variants={itemVariants}
            >
              Step into our luxurious showroom where you can experience the
              craftsmanship and quality of our furniture collections firsthand.
            </motion.p>

            {/* Interactive hint */}
            <motion.div
              className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
              }}
            >
              <MoveDown size={14} />
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div className="space-y-6" variants={containerVariants}>
            {[
              {
                title: "Expert Design Guidance",
                description:
                  "Our professional design consultants will help you find pieces that match your style and space",
                icon: <MessageSquare className="h-6 w-6" />,
                color: "from-violet-500/10 to-violet-500/5",
              },
              {
                title: "Personalized Shopping Experience",
                description:
                  "Enjoy a tailored shopping experience with one-on-one assistance throughout your visit",
                icon: <Users className="h-6 w-6" />,
                color: "from-blue-500/10 to-blue-500/5",
              },
              {
                title: "Quality Material Samples",
                description:
                  "Browse our extensive collection of fabric, leather, and wood finish samples to customize your furniture",
                icon: <Palette className="h-6 w-6" />,
                color: "from-amber-500/10 to-amber-500/5",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-card backdrop-blur-sm border border-muted/40 rounded-xl p-5 hover:border-primary/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                custom={index}
              >
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-primary/10 rounded-lg p-2 text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 font-cormorant">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
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

            {/* CTA Button - Fixed hover state */}
            <motion.div
              className="mt-8 flex justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center group-hover:text-primary">
                    Book Showroom Visit
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
