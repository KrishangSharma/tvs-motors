import Heading from "@/components/Heading";
import { Hero, ServicesSection, YourRide } from "@/components/exports";
import { VideoCarousel } from "@/components/VideoCarousel";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-5">
      <Hero />
      <main className="container mx-auto w-full sm:max-w-7xl">
        <Heading smText="The Making of" lgText="Our Stories" />
        <VideoCarousel />
      </main>
      <ServicesSection />
      <YourRide />
    </main>
  );
}
