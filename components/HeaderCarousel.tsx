"use client";

import { Carousel } from "@/components/ui/carousel";
import Image1 from "@/public/header-images/Corporate landing page Desk-1366x600 -20250214-034900.jpg";
import Image2 from "@/public/header-images/160_4v_HomePageBanner_1366X600.jpg";
import Image3 from "@/public/header-images/MAIN_KV_1366x600 1-20241024-054955.jpg";
import Image4 from "@/public/header-images/RR310-new-banner-desktop.jpg";
import Image5 from "@/public/header-images/TVS125_1366x600.jpg";
import Image6 from "@/public/header-images/apache_tvs_home_banner_desktop.jpg";
import Image7 from "@/public/header-images/Sustainability Banner new.jpg";
import Image8 from "@/public/header-images/Corporate Banner Desktop- 1366x600.jpg";
import Image9 from "@/public/header-images/TVS-Jupiter125_1366x600.jpg";
import Image10 from "@/public/header-images/Corporate Banner Desktop- 1366x600.jpg";
import Image11 from "@/public/header-images/iQube_Family_1366x600px-20240627-101920.jpg";
import Image12 from "@/public/header-images/ntorq-web.jpg";
import Image13 from "@/public/header-images/Black Ka baukhaal Web Banners_W1366 X H600- copy-20240924-063832.jpg";
import Image14 from "@/public/header-images/3300_Desktop-1366x600_eng.jpg";
import Image15 from "@/public/header-images/Coral Silk - Static Banner13102021.jpg";
import Image16 from "@/public/header-images/04_TVS Web Banner - 24-11-2023_Desktop - 1366x600.jpg";
import Image17 from "@/public/header-images/Service and parts Banner_1366x600_Desktop.jpg";

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
    {
      id: 4,
      title: "TVS Apache RR 310",
      button: "Explore Component",
      src: Image4,
    },
    {
      id: 5,
      title: "TVS Jupiter",
      button: "Explore Component",
      src: Image5,
    },
    {
      id: 6,
      title: "TVS Apache RTR Series",
      button: "Explore Component",
      src: Image6,
    },
    {
      id: 7,
      title: "TVS Sustainability",
      button: "Explore Component",
      src: Image7,
    },
    {
      id: 8,
      title: "TVS Flamboyant",
      button: "Explore Component",
      src: Image8,
    },
    {
      id: 9,
      title: "TVS SmartXConnect",
      button: "Explore Component",
      src: Image9,
    },
    {
      id: 10,
      title: "TVS X",
      button: "Explore Component",
      src: Image10,
    },
    {
      id: 11,
      title: "TVS IQube",
      button: "Explore Component",
      src: Image11,
    },
    {
      id: 12,
      title: "TVS NTorq",
      button: "Explore Component",
      src: Image12,
    },
    {
      id: 13,
      title: "TVS Radeon",
      button: "Explore Component",
      src: Image13,
    },
    {
      id: 14,
      title: "TVS Sport",
      button: "Explore Component",
      src: Image14,
    },
    {
      id: 15,
      title: "TVS XL 100 Comfort",
      button: "Explore Component",
      src: Image15,
    },
    {
      id: 16,
      title: "TVS Merchandise",
      button: "Explore Component",
      src: Image16,
    },
    {
      id: 17,
      title: "TVS Service & Support",
      button: "Explore Component",
      src: Image17,
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-[90vh]">
      <Carousel slides={slideData} />
    </div>
  );
}
