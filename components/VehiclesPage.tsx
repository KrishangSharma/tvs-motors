"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VehicleItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Heading from "./Heading";

export default function VehiclesPage({
  vehicles,
}: {
  vehicles: VehicleItem[];
}) {
  const [filteredVehicles, setFilteredVehicles] =
    useState<VehicleItem[]>(vehicles);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  // Filter vehicles by type and price range
  const filterVehicles = () => {
    let filtered = [...vehicles];

    // Apply vehicle type filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((vehicle) => vehicle.type === activeFilter);
    }

    // Apply price range filters
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((vehicle) => {
        return selectedPriceRanges.some((range) => {
          switch (range) {
            case "price-1":
              return vehicle.price < 50000;
            case "price-2":
              return vehicle.price >= 50000 && vehicle.price < 100000;
            case "price-3":
              return vehicle.price >= 100000 && vehicle.price < 150000;
            case "price-4":
              return vehicle.price >= 150000;
            default:
              return false;
          }
        });
      });
    }

    setFilteredVehicles(filtered);
  };

  // Handle price range checkbox changes
  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges((prev) => {
      const newRanges = prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId];
      return newRanges;
    });
  };

  // Update filtered vehicles when filters change
  useEffect(() => {
    filterVehicles();
  }, [activeFilter, selectedPriceRanges]);

  // Filter vehicles by type
  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  // Sort vehicles
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    let sorted = [...filteredVehicles];

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.model.localeCompare(a.model));
        break;
      default:
        // Keep original order
        sorted =
          activeFilter === "all"
            ? vehicles
            : vehicles.filter((vehicle) => vehicle.type === activeFilter);
    }

    setFilteredVehicles(sorted);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-2 sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4">
        <Tabs
          defaultValue="all"
          value={activeFilter}
          onValueChange={handleFilterChange}
          className="hidden sm:inline-block sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="all" className="w-full sm:w-auto">
              All
            </TabsTrigger>
            <TabsTrigger value="Motorcycle" className="w-[95px] sm:w-auto">
              Motorcycles
            </TabsTrigger>
            <TabsTrigger value="Scooter" className="w-full sm:w-auto">
              Scooters
            </TabsTrigger>
            <TabsTrigger value="Moped" className="w-full sm:w-auto">
              Mopeds
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">No Sorting</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="sm:flex">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left">
                <SheetTitle>Filter Vehicles</SheetTitle>
                <SheetDescription>
                  Refine your search with these filters
                </SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Vehicle Type</h3>
                  <RadioGroup
                    defaultValue="all"
                    value={activeFilter}
                    onValueChange={handleFilterChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Vehicles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Motorcycle" id="motorcycle" />
                      <Label htmlFor="motorcycle">Motorcycles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Scooter" id="scooter" />
                      <Label htmlFor="scooter">Scooters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Moped" id="moped" />
                      <Label htmlFor="moped">Mopeds</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="price-1"
                        checked={selectedPriceRanges.includes("price-1")}
                        onCheckedChange={() =>
                          handlePriceRangeChange("price-1")
                        }
                      />
                      <Label htmlFor="price-1">Under ₹50,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="price-2"
                        checked={selectedPriceRanges.includes("price-2")}
                        onCheckedChange={() =>
                          handlePriceRangeChange("price-2")
                        }
                      />
                      <Label htmlFor="price-2">₹50,000 - ₹100,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="price-3"
                        checked={selectedPriceRanges.includes("price-3")}
                        onCheckedChange={() =>
                          handlePriceRangeChange("price-3")
                        }
                      />
                      <Label htmlFor="price-3">₹100,000 - ₹150,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="price-4"
                        checked={selectedPriceRanges.includes("price-4")}
                        onCheckedChange={() =>
                          handlePriceRangeChange("price-4")
                        }
                      />
                      <Label htmlFor="price-4">Above ₹150,000</Label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
          <p className="text-2xl font-bold">
            ₹ {vehicle.price.toLocaleString("en-IN")}
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
