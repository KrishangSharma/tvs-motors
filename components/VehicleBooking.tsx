"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Check, BikeIcon as Motorcycle, User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  Color,
  Motorcycle as MotorcycleType,
  Variant,
} from "@/VehicleTypes/VehicleTypes";
import { urlFor } from "@/sanity/lib/image";
import BookVehicleForm from "./Forms/BookVehicleForm";
import Link from "next/link";

interface VehicleBookingProps {
  vehicle: MotorcycleType;
}

// Booking steps
const steps = [
  { id: 1, name: "Select Vehicle", icon: Motorcycle },
  { id: 2, name: "Submit Details", icon: User },
  { id: 3, name: "Booking Confirmed", icon: CheckCircle },
];

export default function VehicleBooking({ vehicle }: VehicleBookingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    vehicle.variants?.[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    vehicle.variants?.[0]?.colors[0] || null
  );
  const [currentImage, setCurrentImage] = useState<string | null>(
    selectedColor?.image ? urlFor(selectedColor.image).url() : null
  );

  // UseEffect to update the variant if the URL has any
  useEffect(() => {
    const hash = window.location.hash;
    const hashVariant = hash.match(/variant\?=([\w-]+)/i)?.[1];

    if (hashVariant && vehicle.variants) {
      const matchedVariant = vehicle.variants.find(
        (variant) =>
          variant.variantName.toLowerCase() ===
          decodeURIComponent(hashVariant).toLowerCase()
      );
      if (matchedVariant) {
        setSelectedVariant(matchedVariant);
        setSelectedColor(matchedVariant.colors[0]);
      }
    }
  }, [vehicle.variants]);

  // Function to update variant and its associated color
  const updateVariant = (variantName: string) => {
    const newVariant = vehicle.variants?.find(
      (variant) => variant.variantName === variantName
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
      setSelectedColor(newVariant.colors[0]);

      // Update URL hash
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}#variant?=${encodeURIComponent(variantName)}`
      );
    }
  };

  // Update image when color changes
  useEffect(() => {
    if (selectedColor?.image) {
      setCurrentImage(urlFor(selectedColor.image).url());
    }
  }, [selectedColor]);

  // Update color when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setSelectedColor(selectedVariant.colors[0]);
    }
  }, [selectedVariant]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="min-h-screen pb-24 pt-28">
      {/* Step Tracker - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Step Tracker */}
          <div className="hidden sm:flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center relative w-full">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                      step.id < currentStep
                        ? "bg-blue-600 text-white"
                        : step.id === currentStep
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-sm font-medium",
                      step.id <= currentStep
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-4 transition-all duration-500",
                      step.id < currentStep
                        ? "bg-blue-600"
                        : "bg-slate-200 dark:bg-slate-700"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Step Indicator */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center w-full">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                      step.id < currentStep
                        ? "bg-blue-600 text-white"
                        : step.id === currentStep
                          ? "bg-blue-600 text-white ring-2 ring-blue-100 dark:ring-blue-900"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-1 transition-all duration-500",
                        step.id < currentStep
                          ? "bg-blue-600"
                          : "bg-slate-200 dark:bg-slate-700"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-blue-600 dark:text-blue-400 font-medium">
              {steps[currentStep - 1].name}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          {currentStep === 1 && (
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                Select your{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {vehicle.model}
                </span>
              </h1>

              {/* Variant Selection */}
              {vehicle.variants && vehicle.variants.length > 0 && (
                <Tabs
                  defaultValue={selectedVariant?.variantName}
                  value={selectedVariant?.variantName}
                  onValueChange={updateVariant}
                  className="mb-8"
                >
                  <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-slate-100 dark:bg-slate-700/40 rounded-xl">
                    {vehicle.variants.map((variant) => (
                      <TabsTrigger
                        key={variant.variantName}
                        value={variant.variantName}
                        className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm rounded-lg transition-all"
                      >
                        {variant.variantName}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Vehicle Image Display */}
                <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 flex items-center justify-center">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {currentImage && (
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt={`${vehicle.model} - ${selectedVariant?.variantName || ""} - ${selectedColor?.name || ""}`}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-8 flex flex-col h-full">
                  {/* Colors */}
                  {selectedVariant?.colors && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-slate-900 ">
                        Colours
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {selectedVariant.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "group relative flex flex-col items-center",
                              selectedColor?.name === color.name &&
                                "ring-offset-2 ring-offset-white "
                            )}
                          >
                            <div
                              className={cn(
                                "w-16 h-16 rounded-full border-2 transition-all duration-200 grid place-items-center",
                                selectedColor?.name === color.name
                                  ? "border-blue-600 "
                                  : "border-slate-200 "
                              )}
                              style={{ backgroundColor: color.hexCode }}
                            >
                              {selectedColor?.name === color.name && (
                                <Check className="w-6 h-6 text-white drop-shadow-md" />
                              )}
                            </div>
                            <span className="mt-2 text-xs text-slate-700 max-w-[80px]">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variant Features */}
                  {selectedVariant?.variantFeatures && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-slate-900">
                        {selectedVariant.variantName} Features
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedVariant.variantFeatures.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="bg-slate-100 w-max p-3 rounded-lg"
                            >
                              <p className="text-sm text-slate-900">
                                {feature}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Spacer to push buttons to bottom */}
                  <div className="flex-grow"></div>

                  {/* Back/Next Buttons */}
                  <div className="flex justify-between sm:justify-center sm:gap-28 mt-auto">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="px-6 sm:px-8 py-2.5 sm:py-6 text-sm sm:text-base"
                      >
                        Back
                      </Button>
                    </Link>

                    <Button
                      onClick={handleNext}
                      disabled={currentStep === steps.length}
                      className="px-6 sm:px-8 py-2.5 sm:py-6 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-8 min-h-[400px] flex justify-between">
              <div className="w-1/2">
                <BookVehicleForm
                  vehicle={vehicle}
                  selectedVariant={selectedVariant}
                  selectedColor={selectedColor}
                  onSuccess={handleNext}
                  onBack={handleBack}
                  activeStep={currentStep}
                />
              </div>
              <div className=" bg-white max-w-[500px] h-min rounded-lg border shadow-lg p-4">
                <h2 className="text-lg font-bold">Your Selection</h2>
                <div className="flex">
                  <div className="flex flex-col gap-2 items-start text-sm">
                    <p className="text-gray-500 text-sm">
                      {vehicle.model} {selectedVariant!.variantName}
                    </p>
                    <span className=" font-bold mt-3">Color</span>
                    <div className="flex gap-2 items-center">
                      <span
                        style={{ backgroundColor: selectedColor!.hexCode }}
                        className="h-6 w-6 rounded-full mt-2 shadow-md"
                      />
                      <span className="mt-1 text-gray-700">
                        {selectedColor!.name}
                      </span>
                    </div>
                  </div>
                  <Image
                    src={currentImage! || "/placeholder.svg"}
                    alt="Vehicle Image"
                    width={200}
                    height={50}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-8 text-center min-h-[400px] flex items-center justify-center">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Your booking has been confirmed. Thank you for choosing our
                  service.
                </p>
                <div className="mt-6">
                  <Link href="/">
                    <Button variant="default" className="w-full sm:w-auto">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
