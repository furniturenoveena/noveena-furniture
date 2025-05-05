"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Category data
const categories = {
  "imported-used": [
    {
      id: 1,
      name: "Living Room",
      image: "/placeholder.svg?height=300&width=400",
      count: 42,
      description: "Elegant imported living room furniture with character and history",
      accent: "accent-living",
    },
    {
      id: 2,
      name: "Dining Room",
      image: "/placeholder.svg?height=300&width=400",
      count: 28,
      description: "Classic dining sets that bring sophistication to your meals",
      accent: "accent-dining",
    },
    {
      id: 3,
      name: "Bedroom",
      image: "/placeholder.svg?height=300&width=400",
      count: 35,
      description: "Premium bedroom furniture for ultimate comfort and style",
      accent: "accent-bedroom",
    },
    {
      id: 4,
      name: "Office",
      image: "/placeholder.svg?height=300&width=400",
      count: 18,
      description: "Professional office furniture with timeless appeal",
      accent: "accent-office",
    },
  ],
  "brand-new": [
    {
      id: 5,
      name: "Living Room",
      image: "/placeholder.svg?height=300&width=400",
      count: 36,
      description: "Contemporary living room pieces with modern aesthetics",
      accent: "accent-living",
    },
    {
      id: 6,
      name: "Dining Room",
      image: "/placeholder.svg?height=300&width=400",
      count: 24,
      description: "Modern dining sets crafted with premium materials",
      accent: "accent-dining",
    },
    {
      id: 7,
      name: "Bedroom",
      image: "/placeholder.svg?height=300&width=400",
      count: 30,
      description: "Stylish bedroom furniture for a refreshing sanctuary",
      accent: "accent-bedroom",
    },
    {
      id: 8,
      name: "Office",
      image: "/placeholder.svg?height=300&width=400",
      count: 15,
      description: "Ergonomic office solutions for productivity and comfort",
      accent: "accent-office",
    },
  ],
}

export default function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState("imported-used")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-montserrat text-sm tracking-wider uppercase">Browse Our Collection</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Explore By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto body-elegant text-lg">
            Discover our extensive collection of premium furniture organized by style and room type.
          </p>
        </motion.div>

        <Tabs defaultValue="imported-used" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="imported-used" className="text-sm font-montserrat">
                Imported Used
              </TabsTrigger>
              <TabsTrigger value="brand-new" className="text-sm font-montserrat">
                Brand New
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="imported-used" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories["imported-used"].map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} type="imported-used" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brand-new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories["brand-new"].map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} type="brand-new" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="font-montserrat">
            <Link href={`/category/${activeTab}`}>
              View All {activeTab === "imported-used" ? "Imported Used" : "Brand New"} Furniture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: {
    id: number
    name: string
    image: string
    count: number
    description: string
    accent: string
  }
  index: number
  type: string
}

function CategoryCard({ category, index, type }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/category/${type}/${category.name.toLowerCase().replace(" ", "-")}`}>
        <div className="premium-card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className={`text-xl font-bold text-white mb-1 font-cormorant ${category.accent}`}>{category.name}</h3>
              <p className="text-white/80 text-sm mb-2 line-clamp-2">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm">{category.count} Items</span>
                <span className="text-white flex items-center text-sm font-medium group-hover:underline">
                  View Collection{" "}
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
