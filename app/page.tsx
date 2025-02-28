import { Hero, Stories, YourRide } from "@/components/exports";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-5 overflow-x-hidden">
      {/* <HeaderCarousel /> */}
      <Hero />
      <Stories />
      <YourRide />
    </main>
  );
}
