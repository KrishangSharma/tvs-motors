"use client";

import { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import YouTube from "react-youtube";
import { Play } from "lucide-react";
import Story1 from "@/public/yt-stories/story-1.jpg";
import Story2 from "@/public/yt-stories/story-2.jpg";
import Story3 from "@/public/yt-stories/story-3.jpg";
import Story4 from "@/public/yt-stories/story-4.jpg";

// Stories (YouTube Video Links)
const stories = [
  {
    id: 1,
    thumbnail: Story1,
    title: "Celebrating Mr. Venu Srinivasan's Llifetime Achievement Award",
    source: "https://youtu.be/A90E-fu1e3o",
  },
  {
    id: 2,
    thumbnail: Story2,
    title: "",
    source: "https://youtu.be/n7Y89U8AjSs",
  },
  {
    id: 3,
    thumbnail: Story3,
    title: "",
    source: "https://youtu.be/ylNZddpP4YE",
  },
  {
    id: 4,
    thumbnail: Story4,
    title: "",
    source: "https://youtu.be/DHNsur93omY",
  },
];

// Extract YouTube Video ID from URL
const getYouTubeID = (url: string) => {
  const match = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

// VideoCard Component
const VideoCard = ({
  videoId,
  isPlaying,
  setPlayingVideoId,
}: {
  videoId: string;
  isPlaying: boolean;
  setPlayingVideoId: (id: string | null) => void;
}) => {
  return (
    <div
      className={`relative w-full h-56 md:h-[30rem] cursor-pointer rounded-xl overflow-hidden ${
        isPlaying ? "z-50" : "z-10"
      }`}
      onClick={() => setPlayingVideoId(videoId)}
    >
      <div className="w-full h-full">
        <YouTube
          videoId={videoId}
          className="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
          onEnd={() => setPlayingVideoId(null)} // Reset playing state when video ends
        />
      </div>
    </div>
  );
};

// Video Carousel Component
export function VideoCarousel() {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null); // Track currently playing video

  const cards = stories.map((story, index) => {
    const videoId = getYouTubeID(story.source);
    if (!videoId) return null;

    return (
      <div className="relative flex items-center justify-center" key={story.id}>
        {/* Play icon should be hidden if this video is playing */}
        {!playingVideoId || playingVideoId !== videoId ? (
          <Play
            className="absolute z-40 bg-white/70 p-2 rounded-full"
            size={32}
          />
        ) : null}

        <Card
          card={{
            src: story.thumbnail,
            title: story.title,
            category: "",
            content: (
              <VideoCard
                videoId={videoId}
                isPlaying={playingVideoId === videoId}
                setPlayingVideoId={setPlayingVideoId}
              />
            ),
          }}
          index={index}
        />
      </div>
    );
  });

  return (
    <div className="w-full h-full">
      <Carousel items={cards.filter(Boolean)} />
    </div>
  );
}
