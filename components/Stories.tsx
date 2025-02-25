import React from "react";
import { VideoCarousel } from "./VideoCarousel";
import { Heading } from "./Heading";

const Stories = () => {
  return (
    <main className="w-full">
      <Heading
        bg="red-500"
        bgText="Stories"
        textSm="The Making of"
        textLg="Our Stories"
      />
      {/* Story Videos */}
      <VideoCarousel />
    </main>
  );
};

export default Stories;
