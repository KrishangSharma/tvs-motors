"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import Image from "next/image";
import Heading from "./Heading";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { BentoVehicleItem } from "@/types";
import { motion } from "framer-motion";

//! Convert component to SS and prod card to client-side

export default function YourRide() {
  const [vehicles, setVehicles] = useState<BentoVehicleItem[] | null>([]);

  const query = groq`
  *[_type == "vehicle"] {
  slug,
  model,
  "image": images[0].asset->url}
  `;

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
    <div className="container mx-auto p-4">
      <Heading smText="Discover Your Ride" lgText="Vehicles" />
      <BentoGrid className="w-full max-w-7xl  mx-auto md:auto-rows-[20rem] mt-10">
        {vehicles &&
          vehicles.map((vehicle, i) => (
            <Link
              className=" border border-gray-200 rounded-xl shadow-sm"
              key={i}
              href={`/product/${vehicle.slug.current}`}
              passHref
            >
              <BentoGridItem
                title={vehicle.model}
                description={
                  <span className="text-sm">Explore more details</span>
                }
                header={
                  <motion.div
                    className="relative w-full h-48"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.model}
                      layout="fill"
                      className="rounded-xl h-full w-auto object-contain"
                    />
                  </motion.div>
                }
                className="md:col-span-1 cursor-pointer"
                icon={
                  <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
                }
              />
            </Link>
          ))}
      </BentoGrid>
    </div>
  );
}
