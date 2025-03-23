"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HeroImg from "@/public/1037x573-Design-Philosphy 1.png";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bikeY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-red-50 -translate-y-1/2 translate-x-1/3"
          style={{ opacity: opacityBackground }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-50 translate-y-1/2 -translate-x-1/3"
          style={{ opacity: opacityBackground }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full pt-16 pb-24 md:py-0">
          {/* Text content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium tracking-wide"
            >
              PREMIUM PERFORMANCE
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="block">Born to Lead.</span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                Crafted to Dominate.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Unparalleled performance meets cutting-edge design. Experience the
              perfect fusion of power, technology, and style in every ride.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link
                href="/product/vehicles"
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-red-500/25 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore Our Bikes
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>

              <Link
                href="/test-ride"
                className="group relative overflow-hidden rounded-lg border-2 border-blue-600 bg-transparent px-6 py-3.5 text-base font-semibold text-blue-600 transition-all duration-300 hover:text-white"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Book a Test Ride
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image container */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center relative"
            style={{ y: bikeY, scale }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full max-w-2xl">
              {/* Decorative circle behind the bike */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100 via-slate-50 to-red-100 opacity-80"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Bike image */}
              <div className="relative z-10 transform scale-110 md:scale-125">
                <Image
                  src={HeroImg}
                  alt="TVS Premium Motorcycle"
                  width={1500}
                  height={573}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        </motion.div>
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-[1]" />
    </div>
  );
};

export default Hero;
