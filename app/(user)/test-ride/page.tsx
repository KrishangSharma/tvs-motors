import Image from "next/image";
import React from "react";
import TestRideBanner from "@/public/TVS BAU-test-ride-banner.jpg";
import TestRideForm from "@/components/TestRideForm";

const page = () => {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full md:h-[65vh] overflow-hidden -mb-20 lg:-mb-28">
        <Image
          src={TestRideBanner}
          alt="Test Ride Your Dream Vehicle"
          quality={100}
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Booking Form */}
      <TestRideForm />
    </main>
  );
};

export default page;
