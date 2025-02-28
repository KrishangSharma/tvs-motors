"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import HeaderImg from "@/public/models/1500x573-TVS-6334_v1-1.jpg";
import Link from "next/link";

const Hero = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 20;
    const y = ((clientY - top) / height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] mt-20 lg:mt-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 bg-gray-900 text-white">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.h1
          className="text-4xl md:text-6xl leading-tight tracking-wider font-alfa"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Born to Lead. Engineered to Dominate.
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 font-nunito">
          Unparalleled performance. Stunning design. Intelligent technology.
          Discover the ride of your dreams.
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start font-nunito">
          <Link
            href="/vehicles"
            className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-semibold text-lg"
          >
            Explore Our Bikes
          </Link>
          <Link
            href="/test-ride"
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition"
          >
            Find a Dealer
          </Link>
        </div>
      </div>

      {/* Right Side - Bike Image with Direction-Aware Tilt */}
      <div
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.img
          src={HeaderImg.src}
          alt="TVS Bike"
          className="w-3/4 md:w-full max-w-md md:max-w-lg object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
