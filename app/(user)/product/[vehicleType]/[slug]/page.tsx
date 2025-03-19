import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { VehicleDetails } from "@/types";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";

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

const ConfigureForm = dynamic(
  () => import("@/components/Forms/ConfigureForm"),
  {
    ssr: true,
  }
);

export default async function VehiclePage({ params }: Props) {
  const { vehicleType, slug } = await params;
  const formatType =
    vehicleType.charAt(0).toLocaleLowerCase() + vehicleType.slice(1);
  const query = groq`*[_type == "${formatType}" && slug.current == "${slug}"][0]`;
  const vehicle = await client.fetch<VehicleDetails>(query);
  console.log(vehicle);

  return (
    <div className="w-full mx-auto container lg:max-w-7xl pb-8 min-h-screen px-4 md:px-6 ">
      <div className="relative mb-8 md:mb-16 overflow-hidden">
        {/* Vehicle Name in Big Bold Letters */}
        <h1
          className={`text-6xl md:text-8xl lg:text-9xl font-extrabold text-gray-100 pt-8 md:pt-12 pb-4 md:pb-8 z-10 relative ${montserrat.className}`}
        >
          {vehicle.model.toUpperCase()}
        </h1>

        {/* Main Image Carousel */}
        <div className="relative z-20 -mt-16 md:-mt-24 lg:-mt-32">
          <ImageCarousel images={vehicle.images} model={vehicle.model} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Left Side: Vehicle Specifications */}
        <div className="lg:w-2/3">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 ${montserrat.className}`}
          >
            Vehicle Specifications
          </h2>
          <DetailsTabs vehicle={vehicle} />
        </div>

        {/* Right Side: Configure Form (Fixed Position on Desktop) */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <ConfigureForm vehicle={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
}
