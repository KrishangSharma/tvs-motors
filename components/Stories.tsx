import React from "react";
import { VideoCarousel } from "./VideoCarousel";
import Heading from "./Heading";

const Stories = () => {
  return (
    //! Negative Zindex causes video player problem
    <main className="w-full sm:max-w-7xl mx-auto p-2 relative">
      <Heading smText="The Making of" lgText="Our Stories" />
      {/* Story Videos */}
      <VideoCarousel />
    </main>
  );
};

export default Stories;
