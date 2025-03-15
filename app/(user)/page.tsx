import Heading from "@/components/Heading";
import { Hero, YourRide } from "@/components/exports";
import { VideoCarousel } from "@/components/VideoCarousel";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-5">
      <Hero />
      <main className="container mx-auto w-full sm:max-w-7xl p-4 md:p-8">
        <Heading smText="The Making of" lgText="Our Stories" />
        <VideoCarousel />
      </main>
      <YourRide />
    </main>
  );
}
