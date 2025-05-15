"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Filter, X, Loader2, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Product as PrismaProduct, Category } from "@/lib/generated/prisma";

interface Product extends PrismaProduct {
  category: Category;
}

export default function CategoryPage({ params }: { params: { type: string } }) {
  // Get search params from URL
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams?.get("search") || "";
  const urlCategoryParam = searchParams?.get("category") || "";

  // API data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [activeSearchQuery, setActiveSearchQuery] = useState(urlSearchQuery);

  const categoryType = params.type.replace(/-/g, " ");

  // Initialize category filters from URL params if provided
  useEffect(() => {
    if (urlCategoryParam) {
      const formattedCategory = urlCategoryParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setCategoryFilters([formattedCategory]);
    }
  }, [urlCategoryParam]);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
    setActiveSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // Fetch categories and products from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesRes = await fetch("/api/categories");
        const categoriesData = await categoriesRes.json();

        // Fetch products with their categories
        const productsRes = await fetch("/api/products?includeCategory=true");
        const productsData = await productsRes.json();

        if (categoriesData && productsData.success) {
          setCategories(categoriesData.data);
          setProducts(productsData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract available category names
  const categoryNames = Array.from(
    new Set(
      categories
        .filter((category) => {
          if (params.type === "all") {
            return true; // Show all categories
          } else if (params.type.startsWith("imported-used")) {
            return category.type === "IMPORTED_USED";
          } else if (params.type.startsWith("brand-new")) {
            return category.type === "BRAND_NEW";
          } else {
            // For direct category names, show all categories
            return true;
          }
        })
        .map((category) => category.name)
    )
  );

  // Handle search submission
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
  };

  // Filter products when filters change or data is loaded
  useEffect(() => {
    if (products.length === 0) return;

    let filteredProducts = [...products];

    // Filter by category type (from URL params)
    if (categoryType !== "all") {
      if (params.type === "imported-used" || params.type === "brand-new") {
        // Handle main category types (IMPORTED_USED or BRAND_NEW)
        const typeEnum =
          params.type === "imported-used" ? "IMPORTED_USED" : "BRAND_NEW";
        filteredProducts = filteredProducts.filter(
          (product) => product.category && product.category.type === typeEnum
        );
      } else if (
        params.type.includes("imported-used-") ||
        params.type.includes("brand-new-")
      ) {
        // Handle subcategories like "imported-used-sofa"
        const parts = params.type.split("-");
        const mainType =
          parts[0] === "imported" ? "IMPORTED_USED" : "BRAND_NEW";
        // Get category name (e.g., "sofa")
        const subCategory = parts.slice(2).join(" ");

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category &&
            product.category.type === mainType &&
            product.category.name.toLowerCase() === subCategory
        );
      } else {
        // Handle direct category names
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category &&
            product.category.name.toLowerCase() === params.type
        );
      }
    }

    // Apply search filter
    if (activeSearchQuery) {
      const query = activeSearchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.category &&
            product.category.name.toLowerCase().includes(query))
      );
    }

    // Apply category filters
    if (categoryFilters.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category && categoryFilters.includes(product.category.name)
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
        filteredProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Featured - no specific sorting
        break;
    }

    setDisplayProducts(filteredProducts);
  }, [
    categoryType,
    categoryFilters,
    priceRange,
    sortOption,
    products,
    categories,
    activeSearchQuery, // Add activeSearchQuery as a dependency
  ]);

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

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p>Loading products...</p>
      </div>
    );
  }

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
            {/* Add search form */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                placeholder="Search products..."
                className="w-[200px] pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

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
              {/* Search form for mobile (shown inside filters) */}
              <div className="md:hidden">
                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search products..."
                    className="pr-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categoryNames.map((categoryName) => (
                    <div key={categoryName} className="flex items-center">
                      <Checkbox
                        id={`category-${categoryName}`}
                        checked={categoryFilters.includes(categoryName)}
                        onCheckedChange={() =>
                          toggleCategoryFilter(categoryName)
                        }
                      />
                      <Label
                        htmlFor={`category-${categoryName}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {categoryName}
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
              {/* Add search to mobile filters */}
              <Accordion type="single" collapsible defaultValue="search">
                <AccordionItem value="search">
                  <AccordionTrigger className="text-lg font-semibold">
                    Search
                  </AccordionTrigger>
                  <AccordionContent>
                    <form onSubmit={handleSearch} className="relative pt-2">
                      <Input
                        placeholder="Search products..."
                        className="pr-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-2 h-10"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="categories">
                  <AccordionTrigger className="text-lg font-semibold">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {categoryNames.map((categoryName) => (
                        <div key={categoryName} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${categoryName}`}
                            checked={categoryFilters.includes(categoryName)}
                            onCheckedChange={() =>
                              toggleCategoryFilter(categoryName)
                            }
                          />
                          <Label
                            htmlFor={`mobile-category-${categoryName}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {categoryName}
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
            {/* Display active search query if present */}
            {activeSearchQuery && (
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">
                    Search results for:
                  </span>
                  <div className="flex items-center bg-muted px-3 py-1 rounded-md">
                    <span className="text-sm font-medium">
                      {activeSearchQuery}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 p-0"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveSearchQuery("");
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {displayProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeSearchQuery
                    ? `No results found for "${activeSearchQuery}". Try a different search term or browse our collections.`
                    : "Try adjusting your filters or check out our other collections."}
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
