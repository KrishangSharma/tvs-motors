import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

// Fetch all vehicles and populate variants
const vehicles = groq`
    *[_type in ["motorcycle", "scooter", "moped"]]
  {
    model,
    variants[]{variantName}
  }
  `;

export default async function fetchVehiclesForForm() {
  const vehicleData = await client.fetch(vehicles);

  return vehicleData;
}
