import React from "react";
import { VideoCarousel } from "./VideoCarousel";

const Stories = () => {
  return (
    <main className="w-full">
      <div className="w-full md:w-1/2 bg-red-500 transform -skew-x-[34deg] pl-8 md:pl-16 -ml-8 md:-ml-10 py-4 md:py-8 font-roboto">
        <div className="uppercase font-bold text-red-700 opacity-10 text-4xl md:text-6xl pl-20 md:pl-44 transform skew-x-[34deg] tracking-widest">
          Stories
        </div>
        <h2 className="text-xs md:text-sm transform skew-x-[34deg] uppercase text-white ml-8 md:ml-16 -mt-8 md:-mt-16">
          The Making of
          <span className="text-2xl md:text-4xl block font-medium tracking-wider">
            Our Stories
          </span>
        </h2>
      </div>
      {/* Story Videos */}
      <VideoCarousel />
    </main>
  );
};

export default Stories;
