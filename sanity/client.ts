import { createClient } from "@sanity/client";
import { getVehicleQuery } from "@/sanity/queries";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Ensure this is set in .env.local
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01", // Use the latest date or match your env file
  useCdn: true, // Set to false if you need fresh data every request
});

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-02-24",
  useCdn: true,
});

export async function getVehicle(id: string) {
  return client.fetch(getVehicleQuery, { id });
}
