"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import type { NavVehicleItem } from "@/types";
import ProdMenuMobile from "./ProductMenu/ProdMenuMobile";
import { Skeleton } from "@/components/ui/skeleton";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function ProductMenu() {
  const [vehicles, setVehicles] = useState<NavVehicleItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const query = groq`
          *[_type in ["motorcycle", "scooter", "moped"]]
          {
            _id,
            slug,
            model,
            type,
            "image": images[0].asset->url
          }
        `;

        const data = await client.fetch(query);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      {/* Main Vehicle Grid */}
      <div className="w-full p-5 hidden lg:block">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            All Vehicles ({vehicles.length})
          </h2>
          <NavigationMenuLink asChild>
            <Link
              href="/product/vehicles"
              className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium"
            >
              Explore All Vehicles
            </Link>
          </NavigationMenuLink>
        </div>

        {loading ? (
          <div className="min-w-max grid lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-40 h-40" />
            ))}
          </div>
        ) : vehicles.length > 0 ? (
          <div className="min-w-max grid lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {vehicles.map((vehicle) => (
              <NavigationMenuLink asChild key={vehicle._id}>
                <Link
                  href={`/product/${vehicle.type.toLowerCase()}/${vehicle.slug.current}`}
                  className="flex flex-col items-center w-40 h-40 gap-3 p-4 rounded-md transition-all ease-in-out border border-gray-200 hover:border-gray-300 bg-gray-50 hover:shadow-md hover:shadow-gray-300 group"
                >
                  <div className="relative overflow-hidden flex items-center justify-center aspect-video transition-all duration-300 group-hover:scale-110">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      width={180}
                      height={100}
                      quality={100}
                      alt={vehicle.model}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center">
                    {vehicle.model}
                  </h3>
                  <span className="text-xs text-gray-500 capitalize">
                    {vehicle.type}
                  </span>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No Vehicles Available</p>
        )}
      </div>

      {/* Mobile Menu with dropdown list */}
      <ProdMenuMobile />
    </>
  );
}
