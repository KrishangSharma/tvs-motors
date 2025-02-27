"use client";

// TODO: Manage videos and zindex of the cards

import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import YouTube from "react-youtube";
import Image from "next/image";

// Stories (YouTube Video Links)
const stories = [
  {
    id: 1,
    source: "https://youtu.be/A90E-fu1e3o",
  },
  {
    id: 2,
    source: "https://youtu.be/n7Y89U8AjSs",
  },
  {
    id: 3,
    source: "https://youtu.be/ylNZddpP4YE",
  },
  {
    id: 4,
    source: "https://youtu.be/DHNsur93omY",
  },
  {
    id: 5,
    source: "https://youtu.be/bSa6aa9Vkus",
  },
  {
    id: 6,
    source: "https://youtu.be/eWwq8nL9VDM",
  },
  {
    id: 7,
    source: "https://youtu.be/J5--LVZA0hg",
  },
  {
    id: 8,
    source: "https://youtu.be/JRD1QhGx0fo",
  },
  {
    id: 9,
    source: "https://youtu.be/AIvn7pKubLY",
  },
  {
    id: 10,
    source: "https://youtu.be/RQVTIMhQ2Gc",
  },
  {
    id: 11,
    source: "https://youtu.be/y0gI-eqbmdA",
  },
  {
    id: 12,
    source: "https://youtu.be/JHLxuzkWBVU",
  },
  {
    id: 13,
    source: "https://youtu.be/GeOwwD0ys9Q",
  },
  {
    id: 14,
    source: "https://youtu.be/zNTGXKL3KSY",
  },
  {
    id: 15,
    source: "https://youtu.be/zNTGXKL3KSY",
  },
];

// Extract YouTube Video ID from URL
const getYouTubeID = (url: string) => {
  const match = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

// VideoCard Component
const VideoCard = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="relative w-full h-56 md:h-64 cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="YouTube Thumbnail"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <YouTube
          videoId={videoId}
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }}
        />
      )}
    </div>
  );
};

// Video Carousel Component
export function VideoCarousel() {
  const cards = stories.map((story, index) => {
    const videoId = getYouTubeID(story.source);
    if (!videoId) return null;

    return (
      <Card
        key={story.id}
        card={{
          src: "",
          title: `Video ${story.id}`,
          category: "Video",
          content: <VideoCard videoId={videoId} />,
        }}
        index={index}
      />
    );
  });

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
