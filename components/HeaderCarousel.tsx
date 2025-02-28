"use client";

import { Carousel } from "@/components/ui/carousel";
import Image1 from "@/public/header-images/Corporate landing page Desk-1366x600 -20250214-034900.jpg";
import Image2 from "@/public/header-images/160_4v_HomePageBanner_1366X600.jpg";
import Image3 from "@/public/header-images/MAIN_KV_1366x600 1-20241024-054955.jpg";

import OptImage1 from "@/public/header-images/mobile/banner-1.jpg";
import OptImage2 from "@/public/header-images/mobile/banner-2.jpg";
import OptImage3 from "@/public/header-images/mobile/banner-3.jpg";

export default function HeaderCarousel() {
  const slideData = [
    {
      id: 1,
      title: "TVS Ronin",
      button: "Explore Component",
      src: Image1,
    },
    {
      id: 2,
      title: "TVS Apache RTR 160 4V",
      button: "Explore Component",
      src: Image2,
    },
    {
      id: 3,
      title: "TVS Raider",
      button: "Explore Component",
      src: Image3,
    },
  ];

  const optimisedSlideData = [
    {
      id: 1,
      title: "TVS Ronin",
      button: "Explore Component",
      src: OptImage1,
    },
    {
      id: 2,
      title: "TVS Apache RTR 160 4V",
      button: "Explore Component",
      src: OptImage2,
    },
    {
      id: 3,
      title: "TVS Raider",
      button: "Explore Component",
      src: OptImage3,
    },
  ];

  return (
    <>
      <div className="relative w-full h-[95vh] overflow-hidden">
        <div className="hidden md:block absolute top-0 left-0 w-full h-full">
          <Carousel slides={slideData} />
        </div>
        <div className="md:hidden absolute top-0 left-0 w-full h-[95vh]">
          <Carousel slides={optimisedSlideData} />
        </div>
      </div>
    </>
  );
}
