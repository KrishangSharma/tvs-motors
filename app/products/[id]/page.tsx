// import { urlFor } from "@/sanity/lib/image";
// import { client } from "@/sanity/lib/client";
// import { groq } from "next-sanity";
// import Image from "next/image";
// import { Vehicle } from "@/types";

// interface PageProps {
//   params: { id: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

// export default async function VehiclePage({ params }: PageProps) {
//   const { id } = params;
//   const query = groq`*[_type == "vehicle" && _id == "${id}"][0]`;
//   const vehicle: Vehicle = await client.fetch(query);

//   const imageUrl = urlFor(vehicle.images?.[0]).toString();

//   return (
//     <div className="container mx-auto px-4 py-8 min-h-screen">
//       {/* Hero Section */}
//       <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] mb-8">
//         {imageUrl && ( // Only render the image if a valid URL exists
//           <Image
//             src={imageUrl}
//             alt={vehicle.model}
//             width={500}
//             height={300}
//             className="object-contain"
//             priority
//           />
//         )}
//       </div>

//       {/* Vehicle Info */}
//       <div className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//           {vehicle.model}
//         </h1>
//         <p className="text-2xl md:text-3xl font-semibold text-primary">
//           ₹{vehicle.price}
//         </p>
//       </div>

//       {/* Specifications Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {/* Engine & Performance */}
//         <div className="bg-card rounded-lg p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Engine & Performance</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Engine Type</span>
//               <span className="font-medium">{vehicle.engineType}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Max Power</span>
//               <span className="font-medium">{vehicle.maxPower}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Max Torque</span>
//               <span className="font-medium">{vehicle.maxTorque}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Fuel System</span>
//               <span className="font-medium">{vehicle.fuelSystem}</span>
//             </div>
//           </div>
//         </div>

//         {/* Transmission & Chassis */}
//         <div className="bg-card rounded-lg p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Transmission & Chassis</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Transmission</span>
//               <span className="font-medium">{vehicle.transmission}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Suspension</span>
//               <span className="font-medium">{vehicle.suspension}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Brakes</span>
//               <span className="font-medium">{vehicle.brakes}</span>
//             </div>
//           </div>
//         </div>

//         {/* Dimensions & Capacity */}
//         <div className="bg-card rounded-lg p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Dimensions & Capacity</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Dimensions</span>
//               <span className="font-medium">{vehicle.dimensions}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Fuel Capacity</span>
//               <span className="font-medium">{vehicle.fuelTankCapacity}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Mileage</span>
//               <span className="font-medium">{vehicle.mileage}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>prod page</div>;
};

export default page;
