import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { Motorcycle } from "@/VehicleTypes/VehicleTypes";
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
  const vehicle = await client.fetch<Motorcycle>(query);

  return (
    <div className="bg-white min-h-screen ">
      {/* Hero Section with Vehicle Name */}
      <div className="relative overflow-hidden text-black bg-white">
        <div className="sm:container mx-auto md:px-0 pt-8 pb-20 md:pt-12 md:pb-32 relative z-10">
          <h1
            className={`container max-w-7xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold
                       tracking-tight leading-none ${montserrat.className} animate-fadeIn`}
          >
            {vehicle.model.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Image Carousel Section */}
      <div className="container mx-auto max-w-7xl px-4 -mt-16 md:-mt-24 lg:-mt-32 relative z-20">
        <div className="bg-background p-2 sm:p-4 rounded-xl md:shadow-xl">
          <ImageCarousel images={vehicle.images} model={vehicle.model} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side: Vehicle Specifications */}
          <div className="lg:w-2/3">
            <h2
              className={`text-2xl md:text-3xl font-bold mb-6 ${montserrat.className}
                         border-b pb-3 border-border/50`}
            >
              Vehicle Specifications
            </h2>
            <div className=" overflow-hidden">
              <DetailsTabs vehicle={vehicle} />
            </div>
          </div>

          {/* Right Side: Configure Form */}
          <div className="lg:w-1/3 lg:mt-0">
            <div
              className={`lg:sticky lg:top-24 bg-card rounded-xl shadow-md overflow-hidden border border-border/50 ${montserrat.className}`}
            >
              <ConfigureForm vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
