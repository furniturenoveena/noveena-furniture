"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Sample products data
import { products } from "@/lib/data";

export default function CategoryPage({ params }: { params: { type: string } }) {
  const [displayProducts, setDisplayProducts] = useState([...products]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryType = params.type.replace(/-/g, " ");

  // Extract available categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products when filters change
  useEffect(() => {
    let filteredProducts = [...products];

    // Filter by category type (from URL params)
    if (categoryType !== "all") {
      if (categoryType === "imported-used" || categoryType === "brand-new") {
        // Handle main category types
        const type =
          categoryType === "imported-used" ? "Imported Used" : "Brand New";
        filteredProducts = filteredProducts.filter(
          (product) => product.type === type
        );
      } else if (
        categoryType.includes("imported-used-") ||
        categoryType.includes("brand-new-")
      ) {
        // Handle subcategories
        const [mainType, subCategory] = categoryType.split("-");
        const type = mainType === "imported" ? "Imported Used" : "Brand New";
        const category =
          subCategory.charAt(0).toUpperCase() + subCategory.slice(1);

        filteredProducts = filteredProducts.filter(
          (product) => product.type === type && product.category === category
        );
      } else {
        // Handle direct category names
        const category =
          categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
        filteredProducts = filteredProducts.filter(
          (product) => product.category.toLowerCase() === categoryType
        );
      }
    }

    // Apply category filters
    if (categoryFilters.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoryFilters.includes(product.category)
      );
    }

    // Apply price range
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you'd sort by date
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - no specific sorting
        break;
    }

    setDisplayProducts(filteredProducts);
  }, [categoryType, categoryFilters, priceRange, sortOption]);

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Update price range
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  // Format the title based on the category type
  const formatTitle = () => {
    if (categoryType === "all") {
      return "All Products";
    } else if (categoryType === "imported-used") {
      return "Imported Used Furniture";
    } else if (categoryType === "brand-new") {
      return "Brand New Furniture";
    } else if (categoryType.includes("imported-used-")) {
      const category = categoryType.split("-")[2];
      return `Imported Used ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Furniture`;
    } else if (categoryType.includes("brand-new-")) {
      const category = categoryType.split("-")[2];
      return `Brand New ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Furniture`;
    } else {
      return `${
        categoryType.charAt(0).toUpperCase() + categoryType.slice(1)
      } Furniture`;
    }
  };

  const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        {categoryType !== "all" && categoryType.includes("-") ? (
          <>
            <Link
              href="/category/all"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </>
        ) : null}
        <span className="font-medium text-foreground">{formatTitle()}</span>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.h1
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {formatTitle()}
          </motion.h1>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={categoryFilters.includes(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-price" className="text-sm">
                        Min
                      </Label>
                      <Select
                        value={priceRange.min.toString()}
                        onValueChange={(value) =>
                          handlePriceRangeChange(Number(value), priceRange.max)
                        }
                      >
                        <SelectTrigger id="min-price">
                          <SelectValue placeholder="Min Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Rs. 0</SelectItem>
                          <SelectItem value="10000">Rs. 10,000</SelectItem>
                          <SelectItem value="25000">Rs. 25,000</SelectItem>
                          <SelectItem value="50000">Rs. 50,000</SelectItem>
                          <SelectItem value="100000">Rs. 100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="max-price" className="text-sm">
                        Max
                      </Label>
                      <Select
                        value={priceRange.max.toString()}
                        onValueChange={(value) =>
                          handlePriceRangeChange(priceRange.min, Number(value))
                        }
                      >
                        <SelectTrigger id="max-price">
                          <SelectValue placeholder="Max Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50000">Rs. 50,000</SelectItem>
                          <SelectItem value="100000">Rs. 100,000</SelectItem>
                          <SelectItem value="200000">Rs. 200,000</SelectItem>
                          <SelectItem value="500000">Rs. 500,000</SelectItem>
                          <SelectItem value="1000000">Rs. 1,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Mobile */}
          <div
            className={cn(
              "fixed inset-0 bg-background z-50 p-6 transition-transform duration-300 transform md:hidden",
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="space-y-6 overflow-auto max-h-[calc(100vh-120px)]">
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-lg font-semibold">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={categoryFilters.includes(category)}
                            onCheckedChange={() =>
                              toggleCategoryFilter(category)
                            }
                          />
                          <Label
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="text-lg font-semibold">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="mobile-min-price" className="text-sm">
                            Min
                          </Label>
                          <Select
                            value={priceRange.min.toString()}
                            onValueChange={(value) =>
                              handlePriceRangeChange(
                                Number(value),
                                priceRange.max
                              )
                            }
                          >
                            <SelectTrigger id="mobile-min-price">
                              <SelectValue placeholder="Min Price" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Rs. 0</SelectItem>
                              <SelectItem value="10000">Rs. 10,000</SelectItem>
                              <SelectItem value="25000">Rs. 25,000</SelectItem>
                              <SelectItem value="50000">Rs. 50,000</SelectItem>
                              <SelectItem value="100000">
                                Rs. 100,000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="mobile-max-price" className="text-sm">
                            Max
                          </Label>
                          <Select
                            value={priceRange.max.toString()}
                            onValueChange={(value) =>
                              handlePriceRangeChange(
                                priceRange.min,
                                Number(value)
                              )
                            }
                          >
                            <SelectTrigger id="mobile-max-price">
                              <SelectValue placeholder="Max Price" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50000">Rs. 50,000</SelectItem>
                              <SelectItem value="100000">
                                Rs. 100,000
                              </SelectItem>
                              <SelectItem value="200000">
                                Rs. 200,000
                              </SelectItem>
                              <SelectItem value="500000">
                                Rs. 500,000
                              </SelectItem>
                              <SelectItem value="1000000">
                                Rs. 1,000,000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {displayProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or check out our other collections.
                </p>
                <Button asChild>
                  <Link href="/category/all">View All Products</Link>
                </Button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerAnimation}
                initial="hidden"
                animate="visible"
              >
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variants={fadeInAnimation}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
