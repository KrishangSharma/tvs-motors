import { HeaderCarousel, Stories, YourRide } from "@/components/exports";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HeaderCarousel />
      <Stories />
      <YourRide />
    </main>
  );
}
