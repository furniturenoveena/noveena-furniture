"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function CloudinaryUpload({
  value,
  onChange,
  label = "Image",
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.includes("image")) {
      alert("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);

      // Create form data for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "noveena"); // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/do08c2xq5/image/upload", // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      {!value && !isUploading && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 p-6 relative">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-full"
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload an image</p>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}

      {isUploading && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 p-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-gray-500">Uploading image...</p>
        </div>
      )}

      {value && !isUploading && (
        <div className="relative rounded-md overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
