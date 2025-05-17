"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

export interface ImageCollection {
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

interface CloudinaryMultipleUploadProps {
  value: ImageCollection;
  onChange: (imageCollection: ImageCollection) => void;
  label?: string;
}

export function CloudinaryMultipleUpload({
  value,
  onChange,
  label = "Images",
}: CloudinaryMultipleUploadProps) {
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: keyof ImageCollection
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.includes("image")) {
      alert("Please upload an image file");
      return;
    }

    try {
      setIsUploading((prev) => ({ ...prev, [imageKey]: true }));

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
        onChange({
          ...value,
          [imageKey]: data.secure_url,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading((prev) => ({ ...prev, [imageKey]: false }));
    }
  };

  const handleRemove = (imageKey: keyof ImageCollection) => {
    onChange({
      ...value,
      [imageKey]: "",
    });
  };

  const renderImageBox = (
    imageKey: keyof ImageCollection,
    required = false
  ) => {
    const imageValue = value[imageKey];
    const imageLabel = `${imageKey.replace("image", "Image")}${
      required ? " *" : ""
    }`;

    return (
      <div className="space-y-1">
        <Label>{imageLabel}</Label>

        {!imageValue && !isUploading[imageKey] && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 p-4 relative">
            <label
              htmlFor={`${imageKey}-upload`}
              className="cursor-pointer flex flex-col items-center justify-center w-full"
            >
              <Upload className="h-6 w-6 text-gray-400" />
              <p className="text-xs text-gray-500">Upload</p>
            </label>
            <input
              id={`${imageKey}-upload`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e, imageKey)}
            />
          </div>
        )}

        {isUploading[imageKey] && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-gray-500">Uploading...</p>
          </div>
        )}

        {imageValue && !isUploading[imageKey] && (
          <div className="relative rounded-md overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={imageValue}
                alt={`${imageLabel}`}
                fill
                className="object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => handleRemove(imageKey)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {renderImageBox("image1", true)}
        {renderImageBox("image2")}
        {renderImageBox("image3")}
        {renderImageBox("image4")}
      </div>
    </div>
  );
}
