import { client } from "@/sanity/lib/client";
import { VideoCarouselClient, type Story } from "./VideoCarousel";

export async function VideoCarousel() {
  const stories = await client.fetch<Story[]>(`*[_type == "ytStories"] {
    _id,
    title,
    source,
    thumbnail
  }`);

  return <VideoCarouselClient stories={stories} />;
}
