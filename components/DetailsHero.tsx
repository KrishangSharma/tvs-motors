"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronRight, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Variant } from "@/VehicleTypes/VehicleTypes";

const montserrat = Montserrat({ subsets: ["latin"] });

interface VehicleHeroProps {
  vehicle: {
    model: string;
    slug: {
      current: string;
    };
    variant: Variant[];
  };
  brochureUrl?: string | null;
  className?: string;
}

export default function DetailsHero({
  vehicle,
  brochureUrl,
  className,
}: VehicleHeroProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showFixedHeader, setShowFixedHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setShowFixedHeader(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden text-black bg-white",
          "transition-all duration-500",
          className
        )}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10"></div>
        <div
          className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-10 hidden lg:block"
          style={{
            transform: `translate(${scrollPosition * 0.1}px, -50%)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Bike className="w-96 h-96" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 md:pt-16 md:pb-28 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-10">
            <div className="space-y-4 max-w-3xl">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold
                         tracking-tight leading-none animate-fadeIn ${montserrat.className}`}
              >
                {vehicle.model.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center md:items-end">
              <Link href={`/book/select/${vehicle.slug.current}`}>
                <Button>Book Your {vehicle.model}</Button>
              </Link>
              {brochureUrl && (
                <Button
                  className="flex items-center gap-2 group hover:shadow-lg transition-shadow duration-300"
                  variant="outline"
                  size="lg"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative w-5 h-5">
                    <FileDown
                      className={cn(
                        "h-5 w-5 absolute transition-all duration-300",
                        isHovering ? "opacity-0 -translate-y-2" : "opacity-100"
                      )}
                    />
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 absolute transition-all duration-300",
                        isHovering ? "opacity-100" : "opacity-0 translate-y-2"
                      )}
                    />
                  </div>
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    Download Brochure
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Fixed header that appears on scroll */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/50 border backdrop-blur-xl px-8 max-w-7xl mx-auto",
          showFixedHeader
            ? "translate-y-[73px] md:translate-y-24 md:mt-1 md:rounded-xl"
            : "-translate-y-full"
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className={`text-xl font-bold ${montserrat.className}`}>
            {vehicle.model.toUpperCase()}
          </h2>
          <div className="flex flex-col items-end sm:flex-row sm:items-center gap-3">
            {vehicle.variant && vehicle.variant.length > 0 ? (
              <Link href={`/book/select/${vehicle.slug.current}`}>
                <Button size={"sm"}>Book Your {vehicle.model}</Button>
              </Link>
            ) : (
              <Link href={`/book/confirm/${vehicle.slug.current}`}>
                <Button size={"sm"}>Book Your {vehicle.model}</Button>
              </Link>
            )}
            {brochureUrl && (
              <Button
                className="flex items-center gap-2 group"
                variant="outline"
                size="sm"
              >
                <FileDown className="h-4 w-4" />
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  Download
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
