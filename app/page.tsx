import { HeaderCarousel, Stories, YourRide } from "@/components/exports";

export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <HeaderCarousel />
      <div className="flex flex-col gap-5">
        <Stories />
        <YourRide />
      </div>
    </main>
  );
}
