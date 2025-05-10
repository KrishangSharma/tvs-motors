import { groq } from "next-sanity";
import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import { fileUrl } from "@/sanity/lib/image";
import { Montserrat } from "next/font/google";
import { DetailsHero } from "@/components/exports";
import type { Motorcycle, Variant } from "@/VehicleTypes/VehicleTypes";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Props {
  params: Promise<{ slug: string; vehicleType: string }>;
}
const ImageCarousel = dynamic(() => import("@/components/ImageCarousel"), {
  ssr: true,
});
const DetailsTabs = dynamic(() => import("@/components/DetailsTab"), {
  ssr: true,
});
const VariantSelector = dynamic(() => import("@/components/VariantSelector"), {
  ssr: true,
});

export default async function VehiclePage({ params }: Props) {
  const { vehicleType, slug } = await params;
  const formatType =
    vehicleType.charAt(0).toLocaleLowerCase() + vehicleType.slice(1);
  const query = groq`*[_type == "${formatType}" && slug.current == "${slug}"][0]`;
  const vehicle = await client.fetch<Motorcycle>(query);

  // URL for vehicle brochure
  const brochureUrl = fileUrl(vehicle.brochure);

  // Sample variant data - replace with actual data from your Sanity schema
  const variants: Variant[] = vehicle.variants ?? [];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden ">
      {/* Hero Section with Vehicle Name */}
      <DetailsHero
        vehicle={{ ...vehicle, variant: variants }}
        brochureUrl={brochureUrl}
      />

      {/* Image Carousel Section */}
      <div className="container mx-auto max-w-7xl px-4 -mt-16 md:-mt-24 lg:-mtw-32 relative z-20">
        <div className="bg-background p-2 sm:p-4 rounded-xl md:shadow-xl">
          <ImageCarousel images={vehicle.images} model={vehicle.model} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side: Vehicle Specifications */}
          <div className="lg:w-full">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-6 ${montserrat.className}
                         border-b pb-3 border-border/50`}
            >
              Vehicle Specifications
            </h2>
            <div className=" overflow-hidden">
              <DetailsTabs vehicle={vehicle} />
            </div>
            {/* Variant Selector Section */}
            {variants && variants.length > 0 && (
              <VariantSelector variants={variants} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
