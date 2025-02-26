import React from "react";
import { VideoCarousel } from "./VideoCarousel";

const Stories = () => {
  return (
    <main className="w-full">
      <div className="w-1/2 bg-red-500 transform -skew-x-[34deg] pl-16 -ml-10 py-8 font-roboto">
        <div className="uppercase font-bold text-red-700 opacity-10 text-6xl pl-44 transform skew-x-[34deg] tracking-widest">
          {/* Background text */}
          Stories
        </div>
        <h2 className="text-sm transform skew-x-[34deg] uppercase text-white ml-16 -mt-16">
          The Making of
          <span className="text-4xl block font-medium tracking-wider">
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
