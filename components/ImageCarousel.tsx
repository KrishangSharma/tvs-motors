"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import type { imageCarouselProps } from "@/types";
import { urlFor } from "@/sanity/lib/image";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ImageCarousel({ images, model }: imageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image with Model Name Overlay */}
      <div className="relative overflow-hidden" ref={carouselRef}>
        <div className="absolute inset-0 z-10 pointer-events-none" />
        {/* Model Name Overlay */}
        <h2
          className={`absolute top-4 left-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-600 z-20 ${montserrat.className}`}
        >
          {model.toUpperCase()}
        </h2>

        {/* Main Image */}
        <div className="relative aspect-[16/9] md:aspect-[16/10] w-5/12 mx-auto overflow-hidden rounded-2xl">
          <Image
            src={urlFor(images[currentIndex]).url()}
            alt={`${model} - Image ${currentIndex + 1}`}
            fill
            priority
            className={cn(
              "object-cover transition-opacity duration-500 shadow-xl",
              isTransitioning ? "opacity-80" : "opacity-100"
            )}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-gray-500/30 backdrop-blur-sm hover:bg-gray-500/50 rounded-full p-2 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute w-10 h-10 right-4 top-1/2 -translate-y-1/2 z-30 bg-gray-500/30 backdrop-blur-sm hover:bg-gray-500/50 rounded-full p-2 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="w-min flex overflow-x-auto gap-2 mt-5 mx-auto pb-2 scrollbar-hide"
        ref={thumbnailsRef}
      >
        {images.map((image, index) => (
          <button
            key={index}
            data-index={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "flex-shrink-0 relative rounded-md overflow-hidden transition-all m-2",
              currentIndex === index
                ? "ring-1 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <div className="w-20 h-20 relative">
              <Image
                src={urlFor(image).url()}
                alt={`${model} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
