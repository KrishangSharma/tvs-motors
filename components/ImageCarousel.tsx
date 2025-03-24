"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { imageCarouselProps } from "@/types";
import { urlFor } from "@/sanity/lib/image";

export default function ImageCarousel({ images, model }: imageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  // Reset the interval whenever currentIndex changes
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up a new interval
    intervalRef.current = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 5000); // Increased to 5 seconds for better user experience

    // Cleanup function to clear interval when component unmounts or currentIndex changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, images.length]);

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
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);

    // Pause auto-advance on touch
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      goToNext();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      goToPrevious();
    }

    // Resume auto-advance after touch
    intervalRef.current = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 5000);
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Placeholder */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 z-10 ${isLoading ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-lg"></div>
        </div>

        {/* Main Image */}
        <div className="relative aspect-[16/9] md:aspect-[16/10] sm:w-5/12 mx-auto overflow-hidden rounded-2xl">
          <Image
            src={urlFor(images[currentIndex]).url() || "/placeholder.svg"}
            alt={`${model} - Image ${currentIndex + 1}`}
            fill
            priority
            className={cn(
              "object-cover transition-all duration-500 shadow-xl",
              isTransitioning
                ? "opacity-80 scale-105"
                : "opacity-100 scale-100",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2 transition-all shadow-md h-10 w-10 flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2 transition-all shadow-md h-10 w-10 flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicator Dots (Mobile) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-primary" : "w-2 bg-primary/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex justify-center overflow-x-auto gap-2 mt-5 mx-auto pb-2 scrollbar-hide"
        ref={thumbnailsRef}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "flex-shrink-0 relative rounded-md overflow-hidden transition-all m-2",
              currentIndex === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <div className="w-20 h-20 relative">
              <Image
                src={urlFor(image).url() || "/placeholder.svg"}
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
