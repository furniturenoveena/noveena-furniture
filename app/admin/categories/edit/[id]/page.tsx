"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "IMPORTED_USED" | "BRAND_NEW";
}

export default function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<Category>({
    id: params.id,
    name: "",
    description: "",
    image: "",
    type: "BRAND_NEW",
  });

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`/api/categories/${params.id}`);
        const data = await res.json();

        if (data) {
          setFormData({
            ...data,
            id: params.id,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch category data. Please try again.",
            variant: "destructive",
          });
          router.push("/admin/categories");
          return;
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast({
          title: "Error",
          description: "Failed to fetch category data. Please try again.",
          variant: "destructive",
        });
        router.push("/admin/categories");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategory();
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

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value as "IMPORTED_USED" | "BRAND_NEW",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Category Updated",
          description: "Category has been successfully updated.",
        });
        router.push("/admin/categories");
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update category",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
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
        <p className="mt-4 text-muted-foreground">Loading category data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
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

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Category Type *</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={handleRadioChange}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BRAND_NEW" id="brand-new" />
                  <Label htmlFor="brand-new" className="cursor-pointer">
                    Brand New
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IMPORTED_USED" id="imported-used" />
                  <Label htmlFor="imported-used" className="cursor-pointer">
                    Imported/Used
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
