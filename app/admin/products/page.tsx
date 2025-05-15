"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Product type definition based on Prisma schema
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
  category?: {
    id: string;
    name: string;
    type: "IMPORTED_USED" | "BRAND_NEW";
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch products with category information
        const productRes = await fetch("/api/products?includeCategory=true");
        const productData = await productRes.json();

        if (productData.success) {
          setProducts(productData.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch products. Please try again.",
            variant: "destructive",
          });
        }

        // Fetch categories
        const categoryRes = await fetch("/api/categories");
        const categoryData = await categoryRes.json();

        if (categoryData.success) {
          setCategories(
            categoryData.data.map((cat: any) => ({
              id: cat.id,
              name: cat.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Get unique types from products for filters
  const types = Array.from(
    new Set(
      products.map((product) => product.category?.type || "").filter(Boolean)
    )
  );

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.categoryId === categoryFilter;
    const matchesType =
      typeFilter === "all" || product.category?.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products?id=${productToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Product Deleted",
          description: "The product has been successfully deleted.",
        });
        // Remove the deleted product from the state
        setProducts(products.filter((p) => p.id !== productToDelete));
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Products
        </h1>
        <Button
          asChild
          className="w-full sm:w-auto justify-center hover:bg-white hover:text-primary border border-transparent hover:border-primary"
        >
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "IMPORTED_USED" ? "Imported/Used" : "Brand New"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Products Table */}
      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] min-w-[60px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No products found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>{" "}
                    <TableCell className="font-medium">
                      <div>
                        {product.name}
                        <div className="md:hidden mt-1 text-xs text-muted-foreground">
                          <span className="mr-2">
                            {product.category?.type === "IMPORTED_USED"
                              ? "Imported"
                              : "Brand New"}
                          </span>
                          •
                          <span className="ml-2">
                            {categories.find((c) => c.id === product.categoryId)
                              ?.name || "-"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {categories.find((c) => c.id === product.categoryId)
                        ?.name || "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.category?.type === "IMPORTED_USED"
                        ? "Imported/Used"
                        : "Brand New"}
                    </TableCell>
                    <TableCell>Rs. {product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this product?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
