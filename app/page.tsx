import {
  Navbar,
  HeaderCarousel,
  Stories,
  YourRide,
} from "@/components/exports";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <header className="w-full h-20 shadow-md bg-white fixed top-0 z-10">
        <Navbar />
      </header>
      {/* Main Content */}
      <main className="mt-20">
        <HeaderCarousel />
        <Stories />
        <YourRide />
      </main>
    </div>
  );
}
