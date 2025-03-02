"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import HeaderImg from "@/public/models/1500x573-TVS-6334_v1-1.jpg";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const { scrollY } = useScroll();
  const bikeY = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-white text-gray-900">
      <motion.div
        className="absolute inset-0 flex flex-col items-center pt-10 md:pt-20 px-6 md:px-12 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full text-center rounded-2xl bg-gradient-to-b from-white via-white/50 to-white/30 backdrop-blur-sm">
          <motion.h1
            className="max-w-4xl mx-auto text-3xl md:text-6xl font-bold leading-tight tracking-wider bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Born to Lead. Crafted to Dominate.
          </motion.h1>

          <motion.p
            className="md:max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mt-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unparalleled performance. Stunning design. Intelligent technology.
            Discover the ride of your dreams.
          </motion.p>

          <motion.div
            className="relative mt-8 flex flex-col sm:flex-row gap-4 justify-center z-[10]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/vehicles"
              className="relative z-[5] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Our Bikes
            </Link>
            <Link
              href="/test-ride"
              className="relative z-[5] border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Find a Dealer
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-28 md:-bottom-10 left-0 right-0 flex justify-center items-end z-[3] pointer-events-none" // 👈 Ensures it doesn’t block clicks
        style={{ y: bikeY }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-full max-w-5xl px-8">
          <Image
            src={HeaderImg.src || "/placeholder.svg"}
            alt="TVS Bike"
            width={1500}
            height={573}
            className="w-full h-auto object-contain scale-110"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default Hero;
