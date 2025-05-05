"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  testimonial: {
    id: number
    name: string
    role: string
    image: string
    content: string
    rating: number
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="h-full">
      <Card className="h-full premium-card overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full relative">
          <div className="absolute top-4 right-4 text-primary/20">
            <Quote className="h-10 w-10 rotate-180" />
          </div>

          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
          </div>

          <p className="text-muted-foreground italic mb-6 flex-grow body-elegant">"{testimonial.content}"</p>

          <div className="flex items-center mt-auto">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold font-cormorant">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground font-montserrat tracking-wider">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
