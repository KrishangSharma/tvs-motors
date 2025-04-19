"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/image";
import { Color, Variant } from "@/VehicleTypes/VehicleTypes";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(
    variants[0].colors[0]
  );

  const [image, setImage] = useState(urlFor(selectedColor.image).url());

  useEffect(() => {
    setSelectedColor(selectedVariant.colors[0]);
    setImage(urlFor(selectedVariant.colors[0].image).url());
  }, [selectedVariant]);

  useEffect(() => {
    setImage(urlFor(selectedColor.image).url());
  }, [selectedColor]);

  return (
    <div>
      {/* Mobile variant Selector */}
      <div className="md:hidden w-full py-8 mt-12 animate-fadeIn rounded-xl border border-border/50 p-4">
        {/* Vehicle/Variant Name Display */}
        <div className="mb-6">
          <h3
            className={`text-3xl md:text-4xl font-bold ${montserrat.className}`}
          >
            <span className="text-primary">{selectedVariant.variantName}</span>
          </h3>
        </div>

        {/* Variant Dropdown */}
        <div className="mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto flex justify-between"
              >
                <span>
                  {selectedVariant
                    ? selectedVariant.variantName
                    : "Select a Variant"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {variants.map((variant, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => setSelectedVariant(variant)}
                  className="flex items-center justify-between"
                >
                  {variant.variantName}
                  {selectedVariant.variantName === variant.variantName && (
                    <Check className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Image Section */}
          <div className="md:w-1/2 lg:w-3/5">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${selectedVariant.variantName} in ${selectedColor.name}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Color Picker Section */}
          <div className="md:w-1/2 lg:w-2/5">
            <h4
              className={`text-lg font-semibold mb-3 ${montserrat.className}`}
            >
              Available Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedVariant.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                  className={cn("relative w-36 h-40 transition-all")}
                  aria-label={`Select ${color.name} color`}
                >
                  <div
                    className="absolute inset-1 rounded-3xl w-full h-full p-2"
                    style={{
                      backgroundColor: color.hexCode,
                      position: "relative",
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className="absolute inset-0 bg-black/10 rounded-3xl"
                        aria-hidden="true"
                      />
                      <div
                        className={`h-7 w-7 rounded-full border-white border-2 relative z-10 flex items-center justify-center`}
                        style={{ backgroundColor: color.hexCode }}
                      >
                        {selectedColor.name === color.name && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white drop-shadow-md" />
                          </span>
                        )}
                      </div>
                      <span className="text-left font-medium text-white">
                        {color.name}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Variant Features */}
        <div className="mt-8">
          <h4 className={`text-xl font-semibold mb-4 ${montserrat.className}`}>
            {selectedVariant.variantName} Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedVariant.variantFeatures &&
              selectedVariant.variantFeatures.map((feature, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="py-2 px-3 text-sm justify-start"
                >
                  {feature}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      {/* Desktop Variant Selector */}
      <div className="hidden md:block w-full py-8 mt-12 animate-fadeIn">
        <h2 className={`text-4xl font-bold mb-12 ${montserrat.className}`}>
          Available Colors
        </h2>

        <div className="w-screen -translate-x-1/2 ml-[50%] relative flex">
          {/* Variant Tabs - Left side column */}
          <div className=" flex flex-col gap-4 self-center">
            {variants.map((variant, idx) => (
              <Button
                key={idx}
                variant={
                  selectedVariant.variantName === variant.variantName
                    ? "default"
                    : "outline"
                }
                className="px-6 py-2 w-min"
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.variantName}
              </Button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-7 flex-1">
            {/* Vehicle Image - Large central display */}
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${selectedVariant.variantName} in ${selectedColor.name}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right side details */}
            <div className="lg:w-2/5">
              {/* Color Picker Section - Horizontal layout */}
              <div className="w-full">
                <div className="flex flex-wrap gap-3">
                  {selectedVariant.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                      className={cn("relative w-36 h-40 transition-all")}
                      aria-label={`Select ${color.name} color`}
                    >
                      <div
                        className="absolute inset-1 rounded-3xl w-full h-full p-2"
                        style={{
                          backgroundColor: color.hexCode,
                          position: "relative",
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <div
                            className="absolute inset-0 bg-black/10 rounded-3xl"
                            aria-hidden="true"
                          />
                          <div
                            className={`h-7 w-7 rounded-full border-white border-2 relative z-10 flex items-center justify-center`}
                            style={{ backgroundColor: color.hexCode }}
                          >
                            {selectedColor.name === color.name && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white drop-shadow-md" />
                              </span>
                            )}
                          </div>
                          <span className="text-left font-medium text-white">
                            {color.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-sm text-gray-500 mt-4">
                Any images or features displayed on creatives are subject to
                change without prior notice
              </p>

              {/* Variant Features */}
              <div className="mt-8">
                <h4
                  className={`text-xl font-semibold mb-4 ${montserrat.className}`}
                >
                  {selectedVariant.variantName} Features
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedVariant.variantFeatures &&
                    selectedVariant.variantFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="py-2 px-3 text-sm justify-start"
                      >
                        {feature}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
