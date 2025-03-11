import React from "react";
import { VideoCarousel } from "./VideoCarousel";
import Heading from "./Heading";

const Stories = () => {
  return (
    //! Negative Zindex causes video player problem
    <main className="container mx-auto w-full sm:max-w-7xl p-4 md:p-8">
      <Heading smText="The Making of" lgText="Our Stories" />
      {/* Story Videos */}
      <VideoCarousel />
    </main>
  );
};

export default Stories;
