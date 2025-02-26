import {
  Navbar,
  HeaderCarousel,
  Stories,
  YourRide,
} from "@/components/exports";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <header className="w-full h-20 rounded-xl fixed top-0 z-[50]">
        <Navbar />
      </header>
      {/* Main Content */}
      <main>
        <HeaderCarousel />
        <Stories />
        <YourRide />
      </main>
    </div>
  );
}
