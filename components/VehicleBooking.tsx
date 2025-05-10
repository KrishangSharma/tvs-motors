"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Check,
  BikeIcon as Motorcycle,
  User,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Color,
  Motorcycle as MotorcycleType,
  Variant,
} from "@/VehicleTypes/VehicleTypes";
import { urlFor } from "@/sanity/lib/image";

interface VehicleBookingProps {
  vehicle: MotorcycleType;
}

// Booking steps
const steps = [
  { id: 1, name: "Select Vehicle", icon: Motorcycle },
  { id: 2, name: "Submit Details", icon: User },
  { id: 3, name: "Make Payment", icon: CreditCard },
  { id: 4, name: "Booking Confirmed", icon: CheckCircle },
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

  // Function to update variant and its associated color
  const updateVariant = (variantName: string) => {
    const newVariant = vehicle.variants?.find(
      (variant) => variant.variantName === variantName
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
      setSelectedColor(newVariant.colors[0]);
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
                        src={currentImage}
                        alt={`${vehicle.model} - ${selectedVariant?.variantName || ""} - ${selectedColor?.name || ""}`}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-8">
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
                      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                        {selectedVariant.variantName} Features
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedVariant.variantFeatures.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg"
                            >
                              <p className="text-sm text-slate-900 dark:text-white">
                                {feature}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Booking amount starting from ₹5,000 | Fully refundable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-8 text-center min-h-[400px] flex items-center justify-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Submit Details</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  This is a placeholder for the details form.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-8 text-center min-h-[400px] flex items-center justify-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  This is a placeholder for the payment form.
                </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between sm:justify-center sm:gap-28">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 sm:px-8 py-2.5 sm:py-6 text-sm sm:text-base"
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="px-6 sm:px-8 py-2.5 sm:py-6 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentStep === steps.length - 1 ? "Confirm Booking" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
