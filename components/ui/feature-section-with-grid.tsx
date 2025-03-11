"use client";

import { Badge } from "@/components/ui/badge";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface Vehicle {
  slug: {
    current: string;
  };
  model: string;
  price: string;
  image: string;
  type: string;
}

function Feature() {
  const query = groq`
  *[_type in ["motorcycle", "scooter"]]
 {
  slug,
    model,
    price,
    type,
    "image": images[0].asset->url
}
  `;

  const [vehicles, setVehicles] = useState<Vehicle[] | null>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await client.fetch(query);
        setVehicles(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="w-full">
      <div className=" mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>All Vehicles</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-wide max-w-xl text-left ">
                Discover our Wide Range of Vehicles
              </h2>
              <p className="max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Wether it&apos;s your daily driver, or an adventerous buddy, we
                have got all, right here!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles &&
              vehicles.map((vehicle) => (
                <Link
                  href={`/product/${vehicle.type}/${vehicle.slug.current}`}
                  className="flex flex-col gap-2 border rounded-xl overflow-hidden cursor-pointer  font-roboto font-medium"
                  key={vehicle.slug.current}
                >
                  <div className="relative w-full h-48 hover:scale-110 transition-transform duration-300 ease-in-out">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.model}
                      fill
                      className="rounded-xl h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-xl tracking-tight">
                      TVS {vehicle.model}
                    </h3>
                    <p className="text-muted-foreground text-base">
                      ₹ {vehicle.price}
                    </p>
                    <Button variant="outline">
                      <span>View Details</span>
                    </Button>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
