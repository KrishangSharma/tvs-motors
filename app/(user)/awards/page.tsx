import { AwardCard } from "@/components/AwardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groq } from "next-sanity";
import type { Award } from "@/types";
import { client } from "@/sanity/lib/client";

export default async function AwardsPage() {
  const query = groq`*[_type == "Award"] | order(year desc) {
      _id,
      title,
      description,
      year,
      organization,
      "image": image.asset->url
    }
  `;
  const awards: Award[] = await client.fetch(query);

  // Get unique years for filtering
  const years = [...new Set(awards.map((award: Award) => award.year))].sort(
    (a: number, b: number) => b - a
  );

  return (
    <main className="container mx-auto px-4 py-6">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-flow-col auto-cols-auto gap-1">
            <TabsTrigger value="all">All Awards</TabsTrigger>
            {years.map((year: number) => (
              <TabsTrigger key={year} value={year.toString()}>
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award: Award) => (
              <AwardCard key={award._id} award={award} />
            ))}
          </div>
        </TabsContent>

        {years.map((year: number) => (
          <TabsContent key={year} value={year.toString()} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards
                .filter((award: Award) => award.year === year)
                .map((award: Award) => (
                  <AwardCard key={award._id} award={award} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
