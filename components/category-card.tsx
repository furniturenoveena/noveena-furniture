"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  category: {
    id: number
    name: string
    image: string
    count: number
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}>
        <Card className="overflow-hidden group cursor-pointer">
          <div className="relative h-60">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-bold mb-1 font-playfair">{category.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm opacity-90">{category.count} products</p>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
