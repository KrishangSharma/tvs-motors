"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Bike, Gauge } from "lucide-react";
import type { VehicleItem } from "@/types";
import { buttonVariants, cardVariants, imageVariants } from "@/constants";

export default function VehicleCard({
  vehicle,
  index,
}: {
  vehicle: VehicleItem;
  index: number;
}) {
  const vehicleTypeIcon =
    vehicle.type === "motorcycle" ? (
      <Bike className="h-5 w-5" />
    ) : (
      <Gauge className="h-5 w-5" />
    );

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-full flex flex-col"
    >
      <Link
        href={`/product/${vehicle.type}/${vehicle.slug.current}`}
        className="block h-full"
      >
        <div className="relative h-56 overflow-hidden bg-gray-50">
          <motion.div variants={imageVariants} className="h-full w-full">
            <Image
              src={vehicle.image || "/placeholder.svg"}
              alt={vehicle.model}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          </motion.div>
          <div className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1.5">
            {vehicleTypeIcon}
            <span className="text-xs font-medium capitalize">
              {vehicle.type}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-3 flex-grow">
          <h3 className="text-xl font-semibold tracking-tight">
            TVS {vehicle.model}
          </h3>
          <p className="text-primary font-bold text-lg">
            ₹ {vehicle.price.toLocaleString("en-IN")}
          </p>

          <div className="mt-auto pt-4">
            <motion.div variants={buttonVariants} className="inline-block">
              <Button variant="default" className="w-full group">
                View Details
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
