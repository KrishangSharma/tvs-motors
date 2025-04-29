"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Vehicle {
  slug: { current: string };
  model: string;
  type: string;
  image: string;
}

export default function BookPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get vehicles data from the data attribute set by the server component
    const vehiclesElement = document.querySelector(".vehicles-data");
    if (vehiclesElement) {
      try {
        const vehiclesData = JSON.parse(
          vehiclesElement.getAttribute("data-vehicles") || "[]"
        );
        setVehicles(vehiclesData);
      } catch (e) {
        console.error("Error parsing vehicles data:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Filter vehicles based on selected type
  const filteredVehicles =
    selectedType === "all"
      ? vehicles
      : vehicles.filter(
          (vehicle) => vehicle.type.toLowerCase() === selectedType
        );

  if (isLoading) {
    return <div className="py-12 text-center">Loading vehicles...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Book a Test Ride</h1>
      <p className="text-muted-foreground mb-8">
        Select a vehicle from our lineup to book your test ride
      </p>

      <Tabs
        defaultValue="all"
        onValueChange={setSelectedType}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Vehicles</TabsTrigger>
          <TabsTrigger value="motorcycle">Motorcycles</TabsTrigger>
          <TabsTrigger value="scooter">Scooters</TabsTrigger>
          <TabsTrigger value="moped">Mopeds</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredVehicles.map((vehicle) => (
              <Link
                key={vehicle.slug.current}
                href={`/book/${vehicle.slug.current}`}
                className="w-full text-center hover:scale-105 transition-transform ease-in-out duration-300"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      {vehicle.image && (
                        <Image
                          src={vehicle.image}
                          alt={vehicle.model}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{vehicle.model}</CardTitle>
                    <CardDescription className="capitalize">
                      {vehicle.type}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No vehicles found in this category.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
