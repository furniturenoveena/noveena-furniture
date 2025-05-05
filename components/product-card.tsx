"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Heart, Star, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    type: string
    rating?: number
    discountPercentage?: number
    tieredPricing?: {
      min: number
      max: number
      price: number
    }[]
  }
  variants?: any
  className?: string
}

export default function ProductCard({ product, variants, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const inView = useInView(cardRef, { once: true, threshold: 0.1 })

  // 3D tilt effect variables
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * 5
    const rotateYValue = ((centerX - x) / centerX) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const resetTilt = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // Calculate discount price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price - product.price * (product.discountPercentage / 100)
    : null

  // Get lowest tier price if available
  const lowestTierPrice = product.tieredPricing?.length
    ? product.tieredPricing[product.tieredPricing.length - 1].price
    : null

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={cn("group", className)}
    >
      <Card
        className="overflow-hidden premium-card border border-primary/5"
        style={{
          transform: isHovered ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)` : "none",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.14)" : "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          resetTilt()
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="relative aspect-square premium-image-container overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover premium-image"
            style={{
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s ease"
            }}
          />

          {/* Elegant gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-primary to-primary/80 text-white hover:bg-primary/90 shadow-md backdrop-blur-sm"
              >
                {product.type}
              </Badge>

              {product.discountPercentage && (
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-accent-dining to-accent-dining/80 text-white shadow-md backdrop-blur-sm"
                >
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>

            <motion.div 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-9 w-9 hover:bg-white hover:text-primary shadow-lg backdrop-blur-sm bg-white/50"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white/90 backdrop-blur-lg border-primary/10">
                    <p>Add to wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            <div className="absolute bottom-6 inset-x-0 flex justify-center gap-3">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.4 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/product/${product.id}`}>
                        <Button 
                          className="rounded-full bg-white text-primary hover:bg-white/90 shadow-lg font-montserrat text-xs tracking-wide px-5 py-2 h-auto"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Quick View
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/90 backdrop-blur-lg border-primary/10">
                      <p>View product details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="secondary" 
                        className="rounded-full shadow-lg backdrop-blur-sm bg-white/50 hover:bg-white text-primary h-9 w-9 p-0"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/90 backdrop-blur-lg border-primary/10">
                      <p>Add to cart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div>
          </div>
        </div>

        <CardContent className="p-5 card-content">
          <div className="space-y-2">
            <p className="text-xs text-primary/80 font-montserrat tracking-wider uppercase">{product.category}</p>
            <h3 className="font-cormorant font-semibold truncate text-lg">{product.name}</h3>

            {product.rating && (
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.floor(product.rating!) ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
              </div>
            )}
            
            {/* Add subtle divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent my-2"></div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between items-center">
          <div>
            {discountedPrice ? (
              <div className="space-y-1">
                <div className="font-semibold text-primary">{discountedPrice.toLocaleString()} LKR</div>
                <div className="text-sm text-muted-foreground line-through">{product.price.toLocaleString()} LKR</div>
              </div>
            ) : product.tieredPricing ? (
              <div className="space-y-1">
                <div className="font-semibold">From {lowestTierPrice?.toLocaleString()} LKR</div>
                <div className="text-xs text-muted-foreground">Quantity discounts available</div>
              </div>
            ) : (
              <div className="font-semibold">{product.price.toLocaleString()} LKR</div>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <Button 
              size="sm" 
              variant="ghost" 
              className="hover:text-primary group/btn relative overflow-hidden"
            >
              <span className="relative z-10">View Details</span>
              <span className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
