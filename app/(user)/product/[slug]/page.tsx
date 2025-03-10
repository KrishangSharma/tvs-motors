// import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Vehicle } from "@/types";
import dynamic from "next/dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

const ImageGallery = dynamic(() => import("@/components/ImageGallery"), {
  ssr: true,
});
const DetailsTabs = dynamic(() => import("@/components/DetailsTab"), {
  ssr: true,
});

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const query = groq`*[_type == "vehicle" && slug.current == "${slug}"][0]`;
  const vehicle = await client.fetch<Vehicle>(query);

  return (
    <div className="w-full mx-auto lg:max-w-7xl py-16 max-w-xs min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Image Gallery */}
        <div className="md:w-1/2 flex flex-col items-center">
          {/* The ImageGallery includes the square preview frame & thumbnails */}
          <div className="w-full max-w-md">
            <ImageGallery images={vehicle.images} model={vehicle.model} />
          </div>
        </div>

        {/* Right Side: Vehicle Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Category (small font, subtle) */}
          <p className="text-sm text-gray-500 uppercase">
            {vehicle.type || "Vehicle"}
          </p>
          {/* Vehicle Name */}
          <h1 className="text-4xl font-bold">TVS {vehicle.model}</h1>
          {/* Price */}
          <p className="text-xl font-bold">₹{vehicle.price}</p>
          {/* Placeholder for color variants */}
          <div className="py-4">{/* Future color variants go here */}</div>
          {/* Configure Button */}
          <button className="w-full bg-black max-w-sm  text-white py-3 rounded-xl">
            Configure your {vehicle.model}
          </button>
          {/* Tab Navigation */}
          <div className="mt-8">
            {/* <DetailsTabs vehicle={vehicle} /> */}
            <DetailsTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
