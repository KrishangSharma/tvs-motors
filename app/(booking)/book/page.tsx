"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatIndianPrice } from "@/lib/formatPrice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Vehicle {
  model: string;
  slug: { current: string; _type: string };
  image: string;
  _type: string;
  price?: number;
}

const fetchVehicles = async (): Promise<Vehicle[]> => {
  return await client.fetch(
    `*[_type in ["motorcycle", "scooter", "moped", "ev"]]{
      model,
      slug,
      _type,
      "image": images[0].asset->url,
      price
    }`
  );
};

const BookingPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVehicles();

        // Add random prices if not available
        const enhancedData = data.map((vehicle) => ({
          ...vehicle,
          price: vehicle.price || Math.floor(Math.random() * 50) + 30,
        }));

        setVehicles(enhancedData);
        setFilteredVehicles(enhancedData);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((vehicle) => vehicle._type === activeTab)
      );
    }
  }, [activeTab, vehicles]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="w-full py-8 text-center flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900text-transparent bg-clip-text">
              Select Your Perfect Ride
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose from our premium collection of vehicles for your next
              adventure
            </p>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-5 h-10 p-1 bg-slate-100 rounded-xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="motorcycle">Motorcycle</TabsTrigger>
              <TabsTrigger value="scooter">Scooter</TabsTrigger>
              <TabsTrigger value="moped">Moped</TabsTrigger>
              <TabsTrigger value="ev">EVs</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(6)].map((_, index) => (
              <VehicleCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-slate-700 ">
              No vehicles found in this category
            </h3>
            <p className="text-slate-500 mt-2">
              Please try another category or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredVehicles.map((vehicle, idx) => (
              <VehicleCard vehicle={vehicle} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case "motorcycle":
        return "Motorcycle";
      case "scooter":
        return "Scooter";
      case "moped":
        return "Moped";
      case "ev":
        return "Electric Vehicle";
      default:
        return type;
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <Image
          src={vehicle.image || "/placeholder.svg?height=300&width=400"}
          alt={vehicle.model}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 z-20 bg-white/90 text-slate-900 hover:bg-white/80 font-medium">
          {getVehicleTypeLabel(vehicle._type)}
        </Badge>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          {vehicle.model}
        </h2>

        <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-slate-900">
              {vehicle.price && formatIndianPrice(vehicle.price)}
            </span>
          </div>

          <Link href={`/book/select/${vehicle.slug.current}`}>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const VehicleCardSkeleton = () => (
  <div className="rounded-2xl bg-white shadow-md border border-slate-200 overflow-hidden">
    <Skeleton className="h-56 w-full" />
    <div className="p-5">
      <Skeleton className="h-7 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);
