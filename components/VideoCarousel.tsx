"use client";

import { useState } from "react";
import YouTube from "react-youtube";
import { Play } from "lucide-react";
import { stories } from "@/constants";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

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
        isPlaying ? "z-50" : "z-50"
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
            className="absolute z-40 bg-white/40 backdrop-blur-sm p-2 rounded-full"
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

  return <Carousel items={cards.filter(Boolean)} />;
}
