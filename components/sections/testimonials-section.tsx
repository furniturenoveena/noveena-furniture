"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define interface for testimonial item
interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  image: string;
  content: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier easing
      },
    },
  };

  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Testimonials data
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Soma Perera",
      title: "Google Reviewer",
      image:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      content:
        "One of the best furniture shops I have visited. There are two shops on both sides of the road. One side is the showroom and the other side is the warehouse. Affordable and unique furniture items.",
      rating: 5,
    },
    {
      id: 2,
      name: "Buddhi Rasanga",
      title: "Local Guide",
      image:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      content: "Quantity furniture can be bought hear",
      rating: 5,
    },
    {
      id: 3,
      name: "Praveen Alankara",
      title: "Local Guide",
      image:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      content: "Yaa..there are lots of used things to buy....cheap priced😊👍",
      rating: 5,
    },
  ];

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${i < rating ? "text-amber-500" : "text-muted"} mr-1`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </motion.svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background z-0"></div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20 w-64 h-64 rounded-full border border-primary/30"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-20 opacity-10 w-80 h-80 rounded-full border-2 border-primary/20"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
      ></motion.div>
      <motion.div
        className="absolute top-40 right-32 w-8 h-8 opacity-20 bg-primary/20 rounded-full"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="text-primary font-montserrat text-sm tracking-wider uppercase bg-primary/5 px-4 py-2 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Words from Our Clients
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
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our reputation speaks through the experiences of our valued clients.
            Discover why they choose Noveena Furniture for their spaces.
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            variants={quoteIconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute -top-10 left-0 text-primary/10 transform -translate-x-1/2"
          >
            <Quote size={120} strokeWidth={1} />
          </motion.div>

          {/* Testimonial Slider */}
          <div className="relative">
            <Swiper
              modules={[Pagination, Navigation, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              className="testimonial-swiper pb-16"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-muted/40 shadow-md relative overflow-hidden"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                        <motion.div
                          className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30"
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                        <div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            {renderRating(testimonial.rating)}
                          </motion.div>

                          <motion.h3
                            className="text-xl font-bold font-cormorant mb-1"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            {testimonial.name}
                          </motion.h3>

                          <motion.p
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            {testimonial.title}
                          </motion.p>
                        </div>
                      </div>

                      <motion.p
                        className="body-elegant text-lg leading-relaxed relative pl-6 border-l-2 border-primary/30 italic"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                      >
                        {testimonial.content}
                      </motion.p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <div className="flex justify-center mt-4 gap-4">
              <motion.button
                className="flex items-center justify-center h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--primary)" }}
                onClick={() => swiperInstance?.slidePrev()}
              >
                <ArrowLeft size={18} />
              </motion.button>
              <motion.button
                className="flex items-center justify-center h-10 w-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--primary)" }}
                onClick={() => swiperInstance?.slideNext()}
              >
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
