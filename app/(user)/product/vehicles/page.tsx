import { client } from "@/sanity/lib/client";
import type { VehicleItem } from "@/types";
import { groq } from "next-sanity";
import VehiclesPage from "@/components/VehiclesPage";

export default async function Page() {
  const query = groq`
  *[_type in ["motorcycle", "scooter", "moped"]]
  {
    slug,
    model,
    price,
    type,
    "image": images[0].asset->url
  }
  `;

  const vehicles = await client.fetch<VehicleItem[]>(query);

  return <VehiclesPage vehicles={vehicles} />;
}
