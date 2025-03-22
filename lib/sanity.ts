import { createClient } from "next-sanity";
import { footerQuery } from "@/sanity/queries/footer";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getFooterData() {
  try {
    const data = await client.fetch(footerQuery);
    return data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}
