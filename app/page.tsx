import { HeaderCarousel, Stories, YourRide } from "@/components/exports";

export default function Home() {
  return (
    <main className="w-full min-h-screen -mt-20 flex flex-col overflow-hidden">
      <HeaderCarousel />
      <Stories />
      <YourRide />
    </main>
  );
}
