import { Hero, Stories, YourRide } from "@/components/exports";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-5">
      {/* <HeaderCarousel /> */}
      <Hero />
      <Stories />
      <YourRide />
    </main>
  );
}
