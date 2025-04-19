// import Image from "next/image";
import React from "react";
import BuyAMCForm from "@/components/Forms/BuyAMC";
import Image from "next/image";
import FormImage from "@/public/amc-form.jpg";
import fetchVehiclesForForm from "@/lib/fetchVehiclesForForm";

const page = async () => {
  const vehicleData = await fetchVehiclesForForm();
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left side - Fixed image and description (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 h-screen sticky top-0 bg-slate-100">
        <div className="relative w-full h-screen">
          <Image
            src={FormImage}
            alt="Vehicle maintenance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 py-16 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Annual Maintenance Contract
            </h2>
            <p className="text-lg max-w-xl">
              Secure your vehicle&apos;s maintenance with our comprehensive AMC
              plan. Get peace of mind with regular service checks and priority
              support.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Scrollable form */}
      <div className="w-full md:w-1/2 min-h-screen overflow-y-auto p-4 md:p-0 flex items-start justify-center">
        <div className="p-8 w-full">
          <BuyAMCForm vehicleData={vehicleData} />
        </div>
      </div>
    </main>
  );
};

export default page;
