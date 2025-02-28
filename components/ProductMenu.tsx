"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import type { NavVehicleItem } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ProductMenu() {
  const [vehicles, setVehicles] = useState<NavVehicleItem[]>([]);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Vehicle categories
  const vehicleTypes = [
    { id: "Motorcycle", label: "Motorcycles" },
    { id: "Scooter", label: "Scooters" },
    { id: "Moped", label: "Moped" },
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!activeType) return;

      setLoading(true);
      try {
        // GROQ Query to get vehicles based on selected type
        const query = groq`
          *[_type == "vehicle" && type == "${activeType}"] {
            _id,
            slug,
            model,
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
  }, [activeType]);

  // Toggle category visibility
  const toggleCategory = (type: string) => {
    if (activeType === type) {
      setActiveType(null);
    } else {
      setActiveType(type);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      {/* Vehicle type categories */}
      {vehicleTypes.map((type) => (
        <div key={type.id} className="flex flex-col">
          <button
            onClick={() => toggleCategory(type.id)}
            className="flex justify-between items-center py-2 px-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span className="text-lg font-medium">{type.label}</span>
            {activeType === type.id ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {/* Submenu with vehicles of selected type */}
          {activeType === type.id && (
            <div className="ml-4 mt-2 flex flex-col gap-4 border-l-2 pl-4 py-2">
              {loading ? (
                <p className="text-gray-500">Loading vehicles...</p>
              ) : vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <Link
                    key={vehicle._id}
                    href={`/product/${vehicle.slug.current}`}
                    className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="w-[100px] h-[60px] relative flex-shrink-0">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        width={100}
                        height={60}
                        alt={vehicle.model}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-base font-medium">{vehicle.model}</h3>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 italic">No vehicles available</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* All Vehicles link */}
      <Link
        href="/vehicles"
        className="text-lg font-medium py-2 px-1 hover:bg-gray-100 rounded-md transition-colors mt-2"
      >
        All Vehicles
      </Link>
    </div>
  );
}
