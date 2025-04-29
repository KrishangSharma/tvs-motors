"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// Define color variant interface
interface ColorVariant {
  _key: string;
  name: string;
  hexCode: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

interface Variant {
  _key: string;
  variantName: string;
  variantFeatures: string[];
  colors: ColorVariant[];
}

interface Vehicle {
  model: string;
  variants: Variant[];
  enginePerformance: {
    displacement: string;
    maxPower: string;
  };
}

export const VehicleDetails = ({ vehicle }: { vehicle: Vehicle }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [variantImages, setVariantImages] = useState<string[]>([]);

  const selectedVariant = vehicle.variants[selectedVariantIndex];

  // Update current image index when color selection changes
  useEffect(() => {
    setCurrentImageIndex(selectedColorIndex);
  }, [selectedColorIndex]);

  // Update variant images when selected variant or colors change
  useEffect(() => {
    if (
      selectedVariant &&
      selectedVariant.colors &&
      selectedVariant.colors.length > 0
    ) {
      // Map the color variants to their image URLs
      const images = selectedVariant.colors.map((colorVariant) =>
        urlFor(colorVariant.image).width(800).url()
      );
      setVariantImages(images);
    } else {
      setVariantImages(["/placeholder.svg"]);
    }
  }, [selectedVariant]);

  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex === 0
        ? selectedVariant.colors.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(newIndex);
    setSelectedColorIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex =
      currentImageIndex === selectedVariant.colors.length - 1
        ? 0
        : currentImageIndex + 1;

    setCurrentImageIndex(newIndex);
    setSelectedColorIndex(newIndex);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <header className="mx-auto flex flex-col gap-6 text-center mb-8">
        <h1 className="text-3xl font-bold">Select your TVS {vehicle.model}</h1>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {vehicle.variants.map((variant, idx) => (
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ease-in-out duration-200 ${
                selectedVariantIndex === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              key={variant._key}
              onClick={() => {
                setSelectedVariantIndex(idx);
                setSelectedColorIndex(0);
                setCurrentImageIndex(0);
              }}
            >
              {variant.variantName}
            </button>
          ))}
        </div>
      </header>

      <div className="border rounded-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vehicle Image Section */}
          <div className="relative">
            <div className="flex items-center justify-center">
              {variantImages.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              <Image
                src={variantImages[currentImageIndex] || "/placeholder.svg"}
                alt={`TVS ${vehicle.model} ${selectedVariant.variantName} - ${
                  selectedVariant.colors[currentImageIndex]?.name || ""
                }`}
                width={350}
                height={150}
                className="max-w-full h-auto"
              />

              {variantImages.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {variantImages.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {selectedVariant.colors.map((color, idx) => (
                  <button
                    key={color._key}
                    className={`h-2 w-2 rounded-full`}
                    style={{
                      backgroundColor:
                        currentImageIndex === idx ? "#898989" : "#d1d5db",
                    }}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setSelectedColorIndex(idx);
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Specifications Section */}
          <div className="flex flex-col gap-8">
            {/* Colors */}
            <div>
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Colours
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {selectedVariant.colors.map((colorItem, idx) => (
                  <div
                    key={colorItem._key}
                    className="flex flex-col items-center"
                  >
                    <button
                      className="relative w-12 h-12 rounded-full mb-2 border"
                      style={{ backgroundColor: colorItem.hexCode }}
                      onClick={() => {
                        setSelectedColorIndex(idx);
                        setCurrentImageIndex(idx);
                      }}
                      aria-label={`Select ${colorItem.name}`}
                    >
                      {selectedColorIndex === idx && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="text-white h-6 w-6" />
                        </div>
                      )}
                    </button>
                    <span className="text-xs w-20 text-center">
                      {colorItem.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="border-t pt-2">
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-gray-500">Max Power</h3>
                  <p className="font-medium text-lg">
                    {vehicle.enginePerformance.maxPower}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500">Engine Capacity</h3>
                  <p className="font-medium text-lg">
                    {vehicle.enginePerformance.displacement}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            {selectedVariant.variantFeatures &&
              selectedVariant.variantFeatures.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedVariant.variantFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
