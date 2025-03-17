// import Image from "next/image";
import React from "react";
import SuggestionForm from "@/components/Forms/SuggestionForm";
import Image from "next/image";

const page = () => {
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left side - Fixed image and description (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 h-screen sticky top-0 bg-slate-100">
        <div className="relative w-full h-screen">
          <Image
            src="/placeholder.svg?height=1080&width=1080"
            alt="Vehicle maintenance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 py-16 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Share Your Thoughts, Shape Our Service
            </h2>
            <p className="text-lg">
              Your feedback helps us improve our services. Share your
              suggestions and ideas to help us serve you better.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Scrollable form */}
      <div className="w-full md:w-1/2 min-h-screen overflow-y-auto p-4 md:py-8   flex items-start justify-center">
        <SuggestionForm />
      </div>
    </main>
  );
};

export default page;
