import VehicleBooking from "@/components/VehicleBooking";
import { client } from "@/sanity/lib/client";
import { Motorcycle } from "@/VehicleTypes/VehicleTypes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const vehicle = await client.fetch<Motorcycle>(
    `*[_type in ["motorcycle", "scooter", "moped"] && slug.current == "${slug}"][0] {
      _id,
      model,
      images,
      price,
      type,
      variants[] {
        variantName,
        colors[] {
          name,
          hexCode,
          image
        },
        variantFeatures
      },
      enginePerformance {
        displacement,
        capacity,
        maxPower,
        maxTorque
      }
    }`
  );

  return (
    <>
      <VehicleBooking vehicle={vehicle} />
    </>
  );
};

export default page;
