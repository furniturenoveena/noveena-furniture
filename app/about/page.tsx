"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Shield, Users, TicketCheck, Award, ArrowRight, ChevronDown, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  // Refs for scroll-triggered animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Detect when sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: false, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: false, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Scroll progress for each section
  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: valuesScrollProgress } = useScroll({
    target: valuesRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const storyImageY = useTransform(storyScrollProgress, [0, 1], ["0%", "20%"]);
  const valuesBgX = useTransform(valuesScrollProgress, [0, 1], ["0%", "-5%"]);
  
  // Animation variants
  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: custom * 0.1 
      } 
    })
  };
  
  const fadeRightItem = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1
      } 
    })
  };
  
  const fadeLeftItem = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1
      } 
    })
  };
  
  const valueCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: custom * 0.15
      }
    })
  };
  
  const teamMemberVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.2 + (custom * 0.15)
      }
    })
  };

  // Staggered container animation
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with parallax effect */}
      <section ref={heroRef} className="min-h-[80vh] flex items-center relative pt-24 pb-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/10"></div>
          <motion.div 
            className="absolute top-32 left-10 w-64 h-64 rounded-full border border-primary/20 opacity-30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 0.3 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full border-2 border-primary/10 opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 0.2 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          ></motion.div>
          <motion.div 
            className="absolute top-40 right-[25%] w-16 h-16 bg-primary/5 rounded-full opacity-30 blur-xl"
            initial={{ y: -20, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 0.3 } : { y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          ></motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              className="text-left"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeRightItem} custom={0} className="mb-2">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-wider uppercase font-medium">
                  Our Story
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeRightItem} 
                custom={1} 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair"
              >
                About <span className="text-primary">Noveena</span> Furniture
              </motion.h1>
              
              <motion.div 
                variants={fadeRightItem} 
                custom={2}
                className="w-24 h-1 bg-primary/40 mb-6"
              ></motion.div>
              
              <motion.p 
                variants={fadeRightItem} 
                custom={3} 
                className="text-lg text-muted-foreground mb-8 max-w-xl body-elegant"
              >
                Formerly known as homestar.lk, Noveena Furniture is dedicated to transforming living spaces with premium
                quality furniture that combines elegance, comfort, and durability.
              </motion.p>
              
              <motion.div variants={fadeRightItem} custom={4} className="flex gap-4 flex-wrap">
                <Button 
                  variant="default"
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 group relative overflow-hidden"
                >
                  <Link href="/category/all" className="flex items-center gap-2">
                    Explore Our Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div 
                variants={fadeRightItem} 
                custom={6} 
                className="mt-10 pt-6 border-t border-border/50 grid grid-cols-3 gap-4"
              >
                {[
                  { label: "Years of Experience", value: "15+" },
                  { label: "Happy Clients", value: "1000+" },
                  { label: "Luxury Pieces", value: "5000+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold font-playfair text-primary">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Noveena Furniture Showroom"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Decorative corner elements */}
              <motion.div 
                className="absolute top-5 left-5 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <motion.div 
                className="absolute bottom-5 right-5 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              />
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Discover More</span>
            <motion.div
              animate={{
                y: [0, 5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-primary"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section with parallax scrolling */}
      <section ref={storyRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative h-[500px] order-2 lg:order-1"
              initial={{ opacity: 0 }}
              animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Parallax image container */}
              <motion.div 
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ y: storyImageY }}
              >
                <Image 
                  src="/placeholder.svg?height=500&width=600" 
                  alt="Our Story" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              </motion.div>
              
              {/* Floating decoration */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-card border border-border shadow-xl rounded-xl p-6 max-w-[260px]"
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center mb-3">
                  <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                  <p className="text-sm font-medium">EST. 2010</p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "We believe that furniture should tell a story and create a sense of home."
                </p>
                <div className="mt-3 text-sm font-medium text-primary">- Amal Perera, Founder</div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="order-1 lg:order-2"
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeLeftItem} 
                custom={0}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-wider uppercase font-medium mb-4"
              >
                Our Journey
              </motion.div>
              
              <motion.h2 
                variants={fadeLeftItem} 
                custom={1}
                className="text-3xl md:text-4xl font-bold mb-6 font-playfair"
              >
                The Story Behind <span className="text-primary">Noveena</span>
              </motion.h2>
              
              <motion.div 
                variants={fadeLeftItem} 
                custom={2}
                className="w-24 h-1 bg-primary/30 mb-8"
              ></motion.div>

              <div className="space-y-6">
                <motion.div 
                  variants={fadeLeftItem} 
                  custom={3}
                  className="flex gap-4 items-start"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Beginnings</h3>
                    <p className="text-muted-foreground">
                      Our journey began with a simple passion for beautiful, high-quality furniture. What started as
                      homestar.lk has now evolved into Noveena Furniture, a rebranded luxury furniture store dedicated to
                      providing exceptional pieces for discerning customers.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeLeftItem} 
                  custom={4}
                  className="flex gap-4 items-start"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Commitment</h3>
                    <p className="text-muted-foreground">
                      From the beginning, we've been committed to sourcing the finest furniture, whether it's imported used
                      pieces with character and history or brand new items designed with contemporary aesthetics in mind. Each
                      piece in our collection is carefully selected to ensure the highest standards of craftsmanship and design.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeLeftItem} 
                  custom={5}
                  className="flex gap-4 items-start"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Global Connections</h3>
                    <p className="text-muted-foreground">
                      Over the years, we've built relationships with trusted suppliers from around the world, allowing us to
                      offer a diverse range of furniture styles that cater to various tastes and preferences.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section with staggered card animations */}
      <section ref={valuesRef} className="py-24 relative overflow-hidden">
        {/* Dynamic background with scroll effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/5 z-0"
          style={{ x: valuesBgX }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeUpItem} 
              custom={0}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-wider uppercase font-medium mb-4"
            >
              What Drives Us
            </motion.div>
            
            <motion.h2 
              variants={fadeUpItem} 
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-playfair"
            >
              Our Core Values
            </motion.h2>
            
            <motion.div 
              variants={fadeUpItem} 
              custom={2}
              className="w-24 h-1 bg-primary/30 mx-auto mb-6"
            />
            
            <motion.p 
              variants={fadeUpItem} 
              custom={3}
              className="text-muted-foreground max-w-2xl mx-auto text-lg mb-4"
            >
              At the core of Noveena Furniture are the values that drive everything we do. These principles guide our
              decisions and shape our commitment to our customers.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Quality",
                description: "We never compromise on quality. Each piece of furniture in our collection meets our stringent standards for materials, construction, and design.",
                color: "from-violet-500/20 to-violet-500/5",
                iconBg: "bg-violet-500/10"
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Service",
                description: "We believe in personalized service. Our team is dedicated to helping you find the perfect furniture pieces for your space.",
                color: "from-emerald-500/20 to-emerald-500/5",
                iconBg: "bg-emerald-500/10"
              },
              {
                icon: <TicketCheck className="h-10 w-10" />,
                title: "Authenticity",
                description: "We provide accurate information about each furniture piece, including its history, materials, and origin.",
                color: "from-amber-500/20 to-amber-500/5",
                iconBg: "bg-amber-500/10"
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from curating our collection to delivery and after-sales service.",
                color: "from-blue-500/20 to-blue-500/5",
                iconBg: "bg-blue-500/10"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={valueCardVariants}
                initial="hidden"
                animate={valuesInView ? "visible" : "hidden"}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-card backdrop-blur-sm border border-muted p-8 rounded-xl overflow-hidden"
              >
                {/* Background gradient that appears on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`${value.iconBg} h-16 w-16 rounded-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-primary">{value.icon}</div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 font-cormorant relative z-10 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                <p className="text-muted-foreground relative z-10">{value.description}</p>
                
                {/* Decorative corner */}
                <div className="absolute bottom-3 right-3 w-12 h-12 border-b border-r border-primary/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section with advanced hover effects */}
      <section ref={teamRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeUpItem} 
              custom={0}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm tracking-wider uppercase font-medium mb-4"
            >
              The People Behind Noveena
            </motion.div>
            
            <motion.h2 
              variants={fadeUpItem} 
              custom={1}
              className="text-3xl md:text-4xl font-bold mb-4 font-playfair"
            >
              Meet Our Team
            </motion.h2>
            
            <motion.div 
              variants={fadeUpItem} 
              custom={2}
              className="w-24 h-1 bg-primary/30 mx-auto mb-6"
            />
            
            <motion.p 
              variants={fadeUpItem} 
              custom={3}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              The passionate people behind Noveena Furniture who work tirelessly to bring you the finest furniture
              collections.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Amal Perera",
                role: "Founder & CEO",
                bio: "With over 15 years of experience in the furniture industry, Amal leads our team with passion and vision.",
                contact: {
                  email: "amal@noveena.lk",
                  phone: "+94 11 123 4567"
                }
              },
              {
                name: "Nisal Fernando",
                role: "Design Consultant",
                bio: "Nisal has an eye for design and helps customers find the perfect pieces to transform their spaces.",
                contact: {
                  email: "nisal@noveena.lk",
                  phone: "+94 11 123 4568"
                }
              },
              {
                name: "Kumari Jayasinghe",
                role: "Customer Relations",
                bio: "Kumari ensures that our customers receive exceptional service at every step of their journey with us.",
                contact: {
                  email: "kumari@noveena.lk",
                  phone: "+94 11 123 4569"
                }
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={teamMemberVariants}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                className="group relative overflow-hidden"
              >
                <div className="bg-card backdrop-blur-sm border border-muted rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/20">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src="/placeholder.svg?height=300&width=300" 
                      alt={member.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Contact info overlay on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{member.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{member.contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                    <p className="text-primary mb-3 text-sm font-medium">{member.role}</p>
                    <Separator className="mb-3 bg-muted/50" />
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Team expansion CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-lg mb-4">Interested in joining our team?</p>
            <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link href="/contact" className="flex items-center gap-2">
                View Open Positions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with advanced animation */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={ctaInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative bg-primary rounded-2xl overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 opacity-60 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-16 text-center">
              <motion.div
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-3xl mx-auto"
              >
                <motion.span 
                  variants={fadeUpItem} 
                  custom={0}
                  className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6"
                >
                  Experience Our Collection
                </motion.span>
                
                <motion.h2 
                  variants={fadeUpItem} 
                  custom={1}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-playfair"
                >
                  Visit Our Showroom
                </motion.h2>
                
                <motion.p 
                  variants={fadeUpItem} 
                  custom={2}
                  className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                >
                  Experience our furniture collection in person. Our team is ready to assist you in finding the perfect pieces
                  for your home or office.
                </motion.p>
                
                {/* Location info */}
                <motion.div 
                  variants={fadeUpItem} 
                  custom={3}
                  className="flex justify-center flex-wrap gap-6 mb-8 text-white"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>123 Furniture Lane, Colombo 05</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>+94 11 123 4567</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={fadeUpItem} 
                  custom={4}
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 shadow-lg group relative overflow-hidden"
                  >
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <motion.span 
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "100%", opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
