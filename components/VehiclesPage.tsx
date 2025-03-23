"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import type { VehicleItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading from "./Heading";
import { FloatingDockDemo } from "./FloatingDock";
import { FilterSheet, type FilterOptions } from "./filter-sheet";

export default function VehiclesPage({
  vehicles,
}: {
  vehicles: VehicleItem[];
}) {
  const [filteredVehicles, setFilteredVehicles] =
    useState<VehicleItem[]>(vehicles);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("price-low");

  // Calculate min and max price for the price range slider
  const minPrice = Math.min(...vehicles.map((v) => v.price));
  const maxPrice = Math.max(...vehicles.map((v) => v.price));

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [minPrice, maxPrice],
    types: [],
    sortBy: "price-low",
    engineCapacity: [],
    colors: [],
  });

  // Handle filter click from the dock
  const handleFilterClick = (value: string) => {
    setActiveFilter(value);

    // Update the sort option in filter options
    setFilterOptions({
      ...filterOptions,
      sortBy: value,
    });

    // Apply the sorting
    applyFilters({
      ...filterOptions,
      sortBy: value,
    });
  };

  // Handle more options click from the dock
  const handleMoreOptionsClick = () => {
    setFilterSheetOpen(true);
  };

  // Apply all filters and sorting
  const applyFilters = (options: FilterOptions) => {
    let result = [...vehicles];

    // Filter by price range
    result = result.filter(
      (vehicle) =>
        vehicle.price >= options.priceRange[0] &&
        vehicle.price <= options.priceRange[1]
    );

    // Filter by vehicle type
    if (options.types.length > 0) {
      result = result.filter((vehicle) =>
        options.types.some((type) =>
          vehicle.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Filter by engine capacity (this would need to be added to the vehicle type)
    if (options.engineCapacity.length > 0) {
      // Assuming vehicle has an engineCapacity property
      // result = result.filter(vehicle => options.engineCapacity.includes(vehicle.engineCapacity));
    }

    // Filter by color (this would need to be added to the vehicle type)
    if (options.colors.length > 0) {
      // Assuming vehicle has a color property
      // result = result.filter(vehicle => options.colors.includes(vehicle.color));
    }

    // Apply sorting
    result = sortVehicles(result, options.sortBy);

    setFilteredVehicles(result);
  };

  // Sort vehicles based on the selected sort option
  const sortVehicles = (vehicles: VehicleItem[], sortBy: string) => {
    switch (sortBy) {
      case "price-low":
        return [...vehicles].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...vehicles].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...vehicles].sort((a, b) => a.model.localeCompare(b.model));
      case "name-desc":
        return [...vehicles].sort((a, b) => b.model.localeCompare(a.model));
      default:
        // Default to price-low
        return [...vehicles].sort((a, b) => a.price - b.price);
    }
  };

  // Apply initial filters
  useEffect(() => {
    applyFilters(filterOptions);
  }, [vehicles]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <FloatingDockDemo
        onFilterClick={handleFilterClick}
        onMoreOptionsClick={handleMoreOptionsClick}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        initialFilters={filterOptions}
        onApplyFilters={applyFilters}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      {/* Hero Section */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Badge className="px-3 py-1 mb-2 text-sm font-medium bg-primary/10 text-primary border-none">
            Our Collection
          </Badge>
          <Heading
            smText="Discover our curated selection of high-performance vehicles."
            lgText="Premium Vehicles"
          />
        </div>

        {/* Active filter indicator */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filter:</span>
          <Badge variant="secondary" className="capitalize">
            {activeFilter.replace("-", " ")}
          </Badge>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredVehicles.length}{" "}
          {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}
        </p>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug.current} vehicle={vehicle} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: VehicleItem }) {
  const formatIndianPrice = (price: number) => {
    // Convert to 2 decimal places
    const priceWithDecimals = price.toFixed(2);

    // Split the number into whole and decimal parts
    const [wholePart, decimalPart] = priceWithDecimals.split(".");

    // Convert to string and split into array of characters
    const digits = wholePart.split("");

    // Start from the right, leave last 3 digits, then group by 2
    const formattedWholePart = digits.reverse().reduce((acc, digit, i) => {
      if (i === 0) return digit;
      if (i === 1) return digit + acc;
      if (i === 2) return digit + acc;
      if ((i - 3) % 2 === 0) return digit + "," + acc;
      return digit + acc;
    }, "");

    return `₹${formattedWholePart}.${decimalPart}`;
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="capitalize">
            {vehicle.type}
          </Badge>
        </div>
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={vehicle.model}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 gap-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl tracking-tight">
            TVS {vehicle.model}
          </h3>
          <p className="text-2xl font-semibold text-gray-700">
            {formatIndianPrice(vehicle.price)}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <Link href={`/product/${vehicle.type}/${vehicle.slug.current}`}>
            <Button className="w-full group">
              View Details
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
