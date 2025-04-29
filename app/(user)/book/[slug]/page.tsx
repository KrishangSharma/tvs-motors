import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { VehicleDetails } from "@/components/VehicleDetails";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const query = groq`
    *[_type in ["motorcycle", "scooter", "moped"] && slug.current == "${slug}"][0] {
    model,
    variants[],
    enginePerformance {
      displacement,
      maxPower
    }
  }`;
  const vehicle = await client.fetch(query);

  return <VehicleDetails vehicle={vehicle} />;
};

export default Page;
