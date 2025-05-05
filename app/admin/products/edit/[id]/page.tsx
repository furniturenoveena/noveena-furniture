"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/data"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const productId = Number.parseInt(params.id)
  const product = products.find(p => p.id === productId)
  
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    type: "",
    category: "",
    description: "",
    features: [""],
    dimensions: {
      width: "",
      depth: "",
      height: "",
    },
    inStock: true,
    tieredPricing: [
      { min: 1, max: 1, price: 0 },
    ],
  })
  
  const [images, setImages] = useState<string[]>([])
  
  // Load product data
  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        price: product.price.toString(),
        type: product.type,
        category: product.category,
        description: product.description || "",
        features: product.features || [""],
        dimensions: {
          width: product.dimensions.width || "",
          depth: product.dimensions.depth || "",
          height: product.dimensions.height || "",
        },
        inStock: product.inStock !== undefined ? product.inStock : true,
        tieredPricing: product.tieredPricing || [{ min: 1, max: 1, price: product.price }],
      })
      
      // Set images
      setImages([product.image || "/placeholder.svg"])
    }
  }, [product])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleDimensionChange = (dimension: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value,
      },
    }))
  }
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...productData.features]
    updatedFeatures[index] = value
    setProductData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }
  
  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }
  
  const removeFeature = (index: number) => {
    const updatedFeatures = [...productData.features]
    updatedFeatures.splice(index, 1)
    setProductData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }
  
  const handleTieredPricingChange = (index: number, field: 'min' | 'max' | 'price', value: string) => {
    const updatedTieredPricing = [...productData.tieredPricing]
    updatedTieredPricing[index] = {
      ...updatedTieredPricing[index],
      [field]: field === 'price' ? Number(value) : Number(value),
    }
    setProductData((prev) => ({
      ...prev,
      tieredPricing: updatedTieredPricing,
    }))
  }
  
  const addTieredPricing = () => {
    const lastTier = productData.tieredPricing[productData.tieredPricing.length - 1]
    const newMax = lastTier.max + 5
    
    setProductData((prev) => ({
      ...prev,
      tieredPricing: [
        ...prev.tieredPricing,
        { min: lastTier.max + 1, max: newMax, price: lastTier.price * 0.95 },
      ],
    }))
  }
  
  const removeTieredPricing = (index: number) => {
    if (productData.tieredPricing.length <= 1) return
    
    const updatedTieredPricing = [...productData.tieredPricing]
    updatedTieredPricing.splice(index, 1)
    setProductData((prev) => ({
      ...prev,
      tieredPricing: updatedTieredPricing,
    }))
  }
  
  const addImage = () => {
    // In a real app, you would handle file uploads here
    setImages((prev) => [...prev, "/placeholder.svg?height=300&width=300"])
  }
  
  const removeImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }
  
  const handleSelectChange = (field: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form
    if (!productData.name || !productData.price || !productData.type || !productData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    
    // In a real app, you would make an API call to update the product
    setTimeout(() => {
      toast({
        title: "Product Updated",
        description: "The product has been successfully updated.",
      })
      setIsSubmitting(false)
      router.push("/admin/products")
    }, 1500)
  }
  
  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-4">The product you are trying to edit does not exist.</p>
          <Button onClick={() => router.push("/admin/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        </div>
        <Button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="features">Features & Dimensions</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={5}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="price">
                      Base Price (Rs.) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={productData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="type">
                      Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={productData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brand New">Brand New</SelectItem>
                        <SelectItem value="Imported Used">Imported Used</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={productData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Living Room">Living Room</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                        <SelectItem value="Bedroom">Bedroom</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={productData.inStock}
                        onCheckedChange={(checked) =>
                          setProductData((prev) => ({
                            ...prev,
                            inStock: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="in-stock">In Stock</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Product Images</h3>
                  <Button onClick={addImage} type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </div>
                
                <Separator />
                
                {images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="mb-4 rounded-full bg-muted p-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="mb-2 text-sm font-medium">No images added yet</p>
                    <p className="text-center text-sm text-muted-foreground">Upload images to showcase your product</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-md border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm mt-1 text-center">{index === 0 ? "Main Image" : `Image ${index + 1}`}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <Button onClick={addFeature} type="button" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </div>
                  
                  {productData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      {productData.features.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeFeature(index)} type="button">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dimensions</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="width">Width (cm)</Label>
                      <Input
                        id="width"
                        value={productData.dimensions.width}
                        onChange={(e) => handleDimensionChange("width", e.target.value)}
                        placeholder="Width in cm"
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="depth">Depth (cm)</Label>
                      <Input
                        id="depth"
                        value={productData.dimensions.depth}
                        onChange={(e) => handleDimensionChange("depth", e.target.value)}
                        placeholder="Depth in cm"
                      />
                    </div>
                    
                    <div className="grid gap-3">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        value={productData.dimensions.height}
                        onChange={(e) => handleDimensionChange("height", e.target.value)}
                        placeholder="Height in cm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tiered Pricing</h3>
                    <Button onClick={addTieredPricing} type="button" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Pricing Tier
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 font-medium text-sm">
                      <div>Min Quantity</div>
                      <div>Max Quantity</div>
                      <div>Price (Rs.)</div>
                      <div></div>
                    </div>
                    
                    {productData.tieredPricing.map((tier, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 items-center">
                        <Input
                          type="number"
                          value={tier.min}
                          onChange={(e) => handleTieredPricingChange
