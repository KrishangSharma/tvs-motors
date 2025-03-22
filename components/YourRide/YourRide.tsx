import Heading from "../Heading";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { VehicleItem } from "@/types";
import VehicleCard from "./VehicleCard";

export default async function YourRide() {
  const query = groq`
  *[_type in ["motorcycle", "scooter"]]
  {
    slug,
    type,
    model,
    price,
    "image": images[0].asset->url
  }
  `;

  const vehicles: VehicleItem[] = await client.fetch(query);

  return (
    <div className="container mx-auto w-full sm:max-w-7xl p-4 md:p-8 ">
      <Heading smText="Discover Your Ride" lgText="Vehicles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {vehicles.map((vehicle, i) => (
          <VehicleCard key={i} vehicle={vehicle} index={i} />
        ))}
      </div>
    </div>
  );
}
