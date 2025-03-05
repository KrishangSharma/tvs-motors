import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconClipboardCopy } from "@tabler/icons-react";
import Image from "next/image";
import Heading from "./Heading";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { BentoVehicleItem } from "@/types";

export default async function YourRide() {
  const query = groq`
  *[_type == "vehicle"] {
  slug,
  model,
  "image": images[0].asset->url}
  `;

  const vehicles: BentoVehicleItem[] = await client.fetch(query);

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
                  <div className="relative w-full h-48 hover:scale-110 transition-transform duration-300 ease-in-out">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.model}
                      fill
                      className="rounded-xl h-full w-auto object-contain"
                    />
                  </div>
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
