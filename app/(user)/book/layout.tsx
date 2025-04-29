import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Vehicle {
  slug: { current: string };
  model: string;
  type: string;
  image: string;
}

export default async function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch vehicles data directly in the layout
  const query = groq`
  *[_type in ["motorcycle", "scooter", "moped"]]
  {
    slug,
    model,
    type,
    "image": images[0].asset->url
  }
  `;
  const vehicles = await client.fetch<Vehicle[]>(query);

  return (
    <main className="min-h-screen bg-background">
      {/* Pass vehicles data as a data attribute */}
      <div className="vehicles-data" data-vehicles={JSON.stringify(vehicles)}>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </main>
  );
}
