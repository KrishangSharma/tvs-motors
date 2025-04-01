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
    <div className="w-full py-8 animate-fadeIn">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 ${montserrat.className} border-b pb-3 border-border/50`}
      >
        Variant Selector
      </h2>

      {/* Vehicle/Variant Name Display */}
      <div className="mb-6">
        <h3
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${montserrat.className}`}
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
          <h4 className={`text-lg font-semibold mb-3 ${montserrat.className}`}>
            Available Colors
          </h4>
          <div className="flex flex-wrap gap-3">
            {selectedVariant.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColor(color);
                }}
                className={cn(
                  "relative w-10 h-10 rounded-full border-2 transition-all",
                  selectedColor.name === color.name
                    ? "border-primary scale-110"
                    : "border-border hover:scale-105"
                )}
                aria-label={`Select ${color.name} color`}
              >
                <span
                  className="absolute inset-1 rounded-full"
                  style={{ backgroundColor: color.hexCode }}
                />
                {selectedColor.name === color.name && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white drop-shadow-md" />
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-medium text-foreground">
              {selectedColor.name}
            </span>
          </p>
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
  );
}
