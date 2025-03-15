"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ImageGalleryProps } from "@/types";

export default function ImageGallery({ images, model }: ImageGalleryProps) {
  // Start with the first image as the main view
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const mainImageUrl = selectedImage ? urlFor(selectedImage).toString() : "";

  return (
    <div>
      {/* Main Image Preview (square frame) */}
      <div className="relative w-full aspect-square border rounded-md overflow-hidden">
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={model}
            fill
            className="object-contain"
            priority
          />
        )}
      </div>
      {/* Thumbnails (clickable) */}
      <div className="flex mt-4 gap-2 overflow-x-auto">
        {images?.map((img, index) => {
          const imgUrl = urlFor(img).toString();
          return (
            <div
              key={index}
              className={`relative w-16 h-16 border rounded-md cursor-pointer ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={imgUrl}
                alt={`${model} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
