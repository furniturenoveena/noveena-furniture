"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, X, Loader2 } from "lucide-react";
import { CloudinaryUpload } from "@/components/ui/cloudinary-upload";

interface Category {
  id: string;
  name: string;
  type: "IMPORTED_USED" | "BRAND_NEW";
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  image: string;
  dimensions: {
    width: string;
    height: string;
    length: string;
  };
  features: string[];
  tieredPricing: {
    min: number;
    max: number;
    price: number;
  }[];
  colors: {
    id: string;
    name: string;
    value: string;
    image: string;
  }[];
  categoryId: string;
}

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Product>({
    id: params.id,
    name: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 5,
    image: "",
    dimensions: {
      width: "",
      height: "",
      length: "",
    },
    features: [],
    tieredPricing: [],
    colors: [],
    categoryId: "",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newTieredPricing, setNewTieredPricing] = useState({
    min: 1,
    max: 10,
    price: 0,
  });
  const [newColor, setNewColor] = useState({
    id: "",
    name: "",
    value: "#000000",
    image: "",
  });

  // Fetch product and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        // Fetch product data
        const productRes = await fetch(`/api/products/${params.id}`);
        console.log("Product Response:", productRes);

        if (!productRes.ok) {
          throw new Error(`Failed to fetch product: ${productRes.statusText}`);
        }

        const productData = await productRes.json();

        // Set product data directly from API response
        setFormData({
          ...productData,
          id: params.id,
          // Ensure all required properties exist with defaults if needed
          features: productData.features || [],
          tieredPricing: productData.tieredPricing || [],
          colors: productData.colors || [],
          dimensions: productData.dimensions || {
            width: "",
            height: "",
            length: "",
          },
        });

        // Fetch categories
        const categoryRes = await fetch("/api/categories");
        const categoryData = await categoryRes.json();

        if (categoryData.success) {
          setCategories(categoryData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
        router.push("/admin/products");
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [params.id, toast, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleColorImageChange = (url: string) => {
    setNewColor((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addTieredPricing = () => {
    setFormData((prev) => ({
      ...prev,
      tieredPricing: [...prev.tieredPricing, newTieredPricing],
    }));
    setNewTieredPricing({
      min: 1,
      max: 10,
      price: 0,
    });
  };

  const removeTieredPricing = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tieredPricing: prev.tieredPricing.filter((_, i) => i !== index),
    }));
  };

  const addColor = () => {
    if (newColor.name.trim() && newColor.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        colors: [
          ...prev.colors,
          {
            ...newColor,
            id: Date.now().toString(), // Generate a temporary ID
          },
        ],
      }));
      setNewColor({
        id: "",
        name: "",
        value: "#000000",
        image: "",
      });
    }
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Product Updated",
          description: "Product has been successfully updated.",
        });
        router.push("/admin/products");
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    handleSelectChange("categoryId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} (
                        {category.type === "IMPORTED_USED"
                          ? "Imported/Used"
                          : "Brand New"}
                        )
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercentage">Discount Percentage</Label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.discountPercentage || 0}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleNumberChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <CloudinaryUpload
                value={formData.image}
                onChange={handleImageChange}
                label="Product Image"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  name="width"
                  value={formData.dimensions.width}
                  onChange={handleDimensionChange}
                  placeholder="e.g. 50cm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  name="height"
                  value={formData.dimensions.height}
                  onChange={handleDimensionChange}
                  placeholder="e.g. 100cm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Input
                  id="length"
                  name="length"
                  value={formData.dimensions.length}
                  onChange={handleDimensionChange}
                  placeholder="e.g. 75cm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-grow"
                />
                <Button type="button" onClick={addFeature} variant="secondary">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border p-2"
                  >
                    <span className="flex-grow">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {formData.features.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No features added yet.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiered Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="min-quantity">Min Quantity</Label>
                  <Input
                    id="min-quantity"
                    type="number"
                    min="1"
                    value={newTieredPricing.min}
                    onChange={(e) =>
                      setNewTieredPricing({
                        ...newTieredPricing,
                        min: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-quantity">Max Quantity</Label>
                  <Input
                    id="max-quantity"
                    type="number"
                    min="1"
                    value={newTieredPricing.max}
                    onChange={(e) =>
                      setNewTieredPricing({
                        ...newTieredPricing,
                        max: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier-price">Price</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tier-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newTieredPricing.price}
                      onChange={(e) =>
                        setNewTieredPricing({
                          ...newTieredPricing,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={addTieredPricing}
                      variant="secondary"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {formData.tieredPricing.map((tier, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border p-2"
                  >
                    <span className="flex-grow">
                      {tier.min} - {tier.max} units: Rs.{" "}
                      {tier.price.toLocaleString()}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTieredPricing(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {formData.tieredPricing.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No tiered pricing added yet.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="color-name">Color Name</Label>
                  <Input
                    id="color-name"
                    value={newColor.name}
                    onChange={(e) =>
                      setNewColor({ ...newColor, name: e.target.value })
                    }
                    placeholder="e.g. Royal Blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color-value">Color Value</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="color-value"
                      value={newColor.value}
                      onChange={(e) =>
                        setNewColor({ ...newColor, value: e.target.value })
                      }
                      className="w-12 p-1"
                    />
                    <Input
                      value={newColor.value}
                      onChange={(e) =>
                        setNewColor({ ...newColor, value: e.target.value })
                      }
                      placeholder="#RRGGBB"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <CloudinaryUpload
                    value={newColor.image}
                    onChange={handleColorImageChange}
                    label="Color Image"
                  />
                  <Button
                    type="button"
                    onClick={addColor}
                    variant="secondary"
                    className="w-full mt-2"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Color
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {formData.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border p-2"
                  >
                    <div
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <span className="flex-grow">{color.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {formData.colors.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No colors added yet.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
