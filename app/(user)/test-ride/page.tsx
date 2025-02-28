import Image from "next/image";
import React from "react";
import TestRideBanner from "@/public/TVS BAU-test-ride-banner.jpg";
import TestRideForm from "@/components/TestRideForm";

const page = () => {
  return (
    <main className="min-h-screen w-full pt-20">
      <div className="w-full h-64 overflow-hidden">
        <Image
          src={TestRideBanner}
          alt="Test Ride Your Dream Vehicle"
          width={250}
          height={50}
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
