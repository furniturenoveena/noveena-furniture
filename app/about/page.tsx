"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Users, TicketCheck, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInFromRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Noveena Furniture</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Formerly known as homestar.lk, Noveena Furniture is dedicated to transforming living spaces with premium
            quality furniture that combines elegance, comfort, and durability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden aspect-video"
        >
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Noveena Furniture Showroom"
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInFromLeft}
            className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
          >
            <Image src="/placeholder.svg?height=500&width=600" alt="Our Story" fill className="object-cover" />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInFromRight}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our journey began with a simple passion for beautiful, high-quality furniture. What started as
                homestar.lk has now evolved into Noveena Furniture, a rebranded luxury furniture store dedicated to
                providing exceptional pieces for discerning customers.
              </p>
              <p>
                From the beginning, we've been committed to sourcing the finest furniture, whether it's imported used
                pieces with character and history or brand new items designed with contemporary aesthetics in mind. Each
                piece in our collection is carefully selected to ensure the highest standards of craftsmanship and
                design.
              </p>
              <p>
                Over the years, we've built relationships with trusted suppliers from around the world, allowing us to
                offer a diverse range of furniture styles that cater to various tastes and preferences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            At the core of Noveena Furniture are the values that drive everything we do. These principles guide our
            decisions and shape our commitment to our customers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-muted/30 p-6 rounded-lg text-center"
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We never compromise on quality. Each piece of furniture in our collection meets our stringent standards
              for materials, construction, and design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/30 p-6 rounded-lg text-center"
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-muted-foreground">
              We believe in personalized service. Our team is dedicated to helping you find the perfect furniture pieces
              for your space.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted/30 p-6 rounded-lg text-center"
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TicketCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
            <p className="text-muted-foreground">
              We provide accurate information about each furniture piece, including its history, materials, and origin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-muted/30 p-6 rounded-lg text-center"
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-muted-foreground">
              We strive for excellence in everything we do, from curating our collection to delivery and after-sales
              service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            The passionate people behind Noveena Furniture who work tirelessly to bring you the finest furniture
            collections.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative h-64 w-64 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src="/placeholder.svg?height=300&width=300" alt="Team Member" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Amal Perera</h3>
            <p className="text-primary mb-2">Founder & CEO</p>
            <p className="text-muted-foreground">
              With over 15 years of experience in the furniture industry, Amal leads our team with passion and vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="relative h-64 w-64 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src="/placeholder.svg?height=300&width=300" alt="Team Member" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Nisal Fernando</h3>
            <p className="text-primary mb-2">Design Consultant</p>
            <p className="text-muted-foreground">
              Nisal has an eye for design and helps customers find the perfect pieces to transform their spaces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="relative h-64 w-64 mx-auto mb-4 overflow-hidden rounded-full">
              <Image src="/placeholder.svg?height=300&width=300" alt="Team Member" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Kumari Jayasinghe</h3>
            <p className="text-primary mb-2">Customer Relations</p>
            <p className="text-muted-foreground">
              Kumari ensures that our customers receive exceptional service at every step of their journey with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Experience our furniture collection in person. Our team is ready to assist you in finding the perfect pieces
            for your home or office.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
