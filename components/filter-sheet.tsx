"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export type FilterOptions = {
  priceRange: [number, number];
  types: string[];
  sortBy: string;
  engineCapacity: string[];
  colors: string[];
};

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
};

export function FilterSheet({
  open,
  onOpenChange,
  initialFilters,
  onApplyFilters,
  minPrice,
  maxPrice,
}: FilterSheetProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    ...initialFilters,
    priceRange: initialFilters.priceRange || [minPrice, maxPrice],
    types: initialFilters.types || [],
    sortBy: initialFilters.sortBy || "price-low",
    engineCapacity: initialFilters.engineCapacity || [],
    colors: initialFilters.colors || [],
  });

  // Update filters when initialFilters changes
  useEffect(() => {
    setFilters({
      ...initialFilters,
      priceRange: initialFilters.priceRange || [minPrice, maxPrice],
      types: initialFilters.types || [],
      sortBy: initialFilters.sortBy || "price-low",
      engineCapacity: initialFilters.engineCapacity || [],
      colors: initialFilters.colors || [],
    });
  }, [initialFilters, minPrice, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.types, type]
      : filters.types.filter((t) => t !== type);

    setFilters({
      ...filters,
      types: updatedTypes,
    });
  };

  // const handleEngineCapacityChange = (capacity: string, checked: boolean) => {
  //   setFilters({
  //     ...filters,
  //     engineCapacity: checked
  //       ? [...filters.engineCapacity, capacity]
  //       : filters.engineCapacity.filter((c) => c !== capacity),
  //   });
  // };

  const handleSortChange = (value: string) => {
    setFilters({
      ...filters,
      sortBy: value,
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [minPrice, maxPrice],
      types: [],
      sortBy: "price-low",
      engineCapacity: [],
      colors: [],
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter & Sort Options</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Price Range</h3>
            <Slider
              value={filters.priceRange}
              min={minPrice}
              max={maxPrice}
              step={1000}
              onValueChange={handlePriceChange}
              className="mt-6"
            />
            <div className="flex justify-between">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          {/* Sort By */}
          <div className="space-y-4">
            <h3 className="font-medium">Sort By</h3>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={handleSortChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-asc" id="name-asc" />
                <Label htmlFor="name-asc">Name: A-Z</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-desc" id="name-desc" />
                <Label htmlFor="name-desc">Name: Z-A</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Vehicle Type */}
          <div className="space-y-4">
            <h3 className="font-medium">Vehicle Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {["scooter", "motorcycle", "electric", "sport"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={(checked) =>
                      handleTypeChange(type, checked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${type}`} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Engine Capacity - Commented out as requested */}
          {/* <div className="space-y-4">
            <h3 className="font-medium">Engine Capacity</h3>
            <div className="grid grid-cols-2 gap-2">
              {["100-150cc", "150-200cc", "200-250cc", "250cc+"].map((capacity) => (
                <div key={capacity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`capacity-${capacity}`}
                    checked={filters.engineCapacity.includes(capacity)}
                    onCheckedChange={(checked) =>
                      handleEngineCapacityChange(capacity, checked as boolean)
                    }
                  />
                  <Label htmlFor={`capacity-${capacity}`}>{capacity}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator /> */}
        </div>

        <SheetFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <SheetClose asChild>
            <Button
              variant="outline"
              onClick={handleReset}
              className="sm:flex-1"
            >
              Reset Filters
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={handleApply} className="sm:flex-1">
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
