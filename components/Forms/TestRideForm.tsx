"use client";

import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Heading from "@/components/Heading";
import ReCAPTCHA from "react-google-recaptcha";
import { testRideFormSchema } from "@/lib/formSchemas";

type FormValues = z.infer<typeof testRideFormSchema>;

export default function TestRideForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [captchaValue, setCaptchaValue] = useState("");

  const captchaRef = useRef<ReCAPTCHA>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(testRideFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      otp: "",
      pincode: "",
      vehicle: "",
      variant: "",
      dealer: "",
      interestedInOffers: false,
      authorizeContact: true,
    },
  });

  // Sample vehicle data
  const vehicles = [
    { id: "1", name: "TVS Apache RR 310" },
    { id: "2", name: "TVS Apache RTR 200 4V" },
    { id: "3", name: "TVS Ronin" },
    { id: "4", name: "TVS Jupiter" },
    { id: "5", name: "TVS NTORQ" },
  ];

  // Sample variant data based on selected vehicle
  const getVariants = React.useCallback((vehicleId: string) => {
    switch (vehicleId) {
      case "1":
        return [
          { id: "1-1", name: "Standard" },
          { id: "1-2", name: "BTO" },
        ];
      case "2":
        return [
          { id: "2-1", name: "Single Channel ABS" },
          { id: "2-2", name: "Dual Channel ABS" },
        ];
      case "3":
        return [
          { id: "3-1", name: "Single Tone" },
          { id: "3-2", name: "Dual Tone" },
          { id: "3-3", name: "Triple Tone" },
        ];
      case "4":
        return [
          { id: "4-1", name: "Standard" },
          { id: "4-2", name: "ZX" },
          { id: "4-3", name: "ZX Disc" },
          { id: "4-4", name: "Classic" },
        ];
      case "5":
        return [
          { id: "5-1", name: "Race XP" },
          { id: "5-2", name: "Super Squad Edition" },
          { id: "5-3", name: "Standard" },
        ];
      default:
        return [];
    }
  }, []);

  // Sample dealers based on pincode
  const getDealers = React.useCallback((pincode: string) => {
    // This would typically be an API call
    return [
      { id: "d1", name: "TVS Motors Authorized Dealer - City Center" },
      { id: "d2", name: "TVS Motors Authorized Dealer - Highway Road" },
      { id: "d3", name: "TVS Motors Authorized Dealer - Main Street" },
    ];
  }, []);

  const [variants, setVariants] = React.useState<
    { id: string; name: string }[]
  >([]);

  const [dealers, setDealers] = React.useState<{ id: string; name: string }[]>(
    []
  );

  // Handle vehicle change to update variants
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "vehicle") {
        const vehicleId = value.vehicle;
        if (vehicleId) {
          setVariants(getVariants(vehicleId));
          form.setValue("variant", ""); // Reset variant when vehicle changes
        } else {
          setVariants([]); // Reset variants when no vehicle is selected
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, getVariants]);

  // Handle pincode change to update dealers
  React.useEffect(() => {
    const pincode = form.watch("pincode");
    if (pincode && pincode.length === 6) {
      setDealers(getDealers(pincode));
    }
  }, [form.watch, getDealers]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = form.getValues();
    setIsSubmitting(true);

    try {
      // Send the form data to the API
      const bookingResponse = await fetch("/api/book-test-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to book test ride");
      }

      setIsSubmitting(false);
      form.reset();
      setActiveStep(1);
      captchaRef.current?.reset();
      setCaptchaValue("");

      // Show success message or redirect
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  };

  // Handle location detection
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);

    // Simulate geolocation and pincode fetching
    setTimeout(() => {
      form.setValue("pincode", "400001");
      setDealers(getDealers("400001"));
      setIsDetectingLocation(false);
    }, 2000);
  };

  // Reset form
  const handleReset = () => {
    form.reset();
    setActiveStep(1);
  };

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (activeStep) {
      case 1:
        return (
          form.getValues("name") !== "" &&
          form.getValues("email") !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.getValues("email")) &&
          form.getValues("phone") !== "" &&
          form.getValues("phone").length === 10
        );
      case 2:
        return (
          form.getValues("pincode") !== "" &&
          form.getValues("pincode").length === 6 &&
          form.getValues("dealer") !== ""
        );
      case 3:
        return (
          form.getValues("vehicle") !== "" &&
          form.getValues("variant") !== "" &&
          form.getValues("authorizeContact") === true &&
          captchaValue !== "" // Add captcha validation
        );
      default:
        return false;
    }
  };

  const handleCaptchaChange = async (value: string | null) => {
    setCaptchaValue(value || "");

    const captchaResponse = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captcha: value }),
    });

    if (!captchaResponse.ok) {
      // Handle error appropriately
      throw new Error("Captcha verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4 md:p-8 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side - Form */}
        <div className="w-full bg-white p-6 md:p-10">
          <div className="mb-8">
            <Heading
              lgText="Get a Taste of Your Dream Vehicle"
              smText="Book a test ride and experience the thrill firsthand"
            />
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div
                className={`flex flex-col items-center ${activeStep >= 1 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeStep >= 1 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
                >
                  1
                </div>
                <span className="text-xs font-medium">Personal Info</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`flex flex-col items-center ${activeStep >= 2 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeStep >= 2 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
                >
                  2
                </div>
                <span className="text-xs font-medium">Location</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`flex flex-col items-center ${activeStep >= 3 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${activeStep >= 3 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
                >
                  3
                </div>
                <span className="text-xs font-medium">Vehicle Details</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h3>

                  {/* Name and Email Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              {...field}
                              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your mobile number"
                              {...field}
                              autoComplete="off"
                              maxLength={10}
                              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12"
                              onInput={(e) => {
                                e.currentTarget.value =
                                  e.currentTarget.value.replace(/\D/g, "");
                                field.onChange(e);
                              }}
                              onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* OTP Field */}
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            OTP Verification
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter OTP"
                              {...field}
                              autoComplete="off"
                              maxLength={6}
                              className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Location Information */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Location Information
                  </h3>

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/2">
                          <FormLabel className="text-gray-700">
                            Pincode
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter Pincode"
                                {...field}
                                className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 pl-10"
                                autoComplete="off"
                                maxLength={6}
                                onInput={(e) => {
                                  const value = e.currentTarget.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  e.currentTarget.value = value;
                                  field.onChange(value);

                                  // Update dealers when valid pincode is entered
                                  if (value.length === 6) {
                                    setDealers(getDealers(value));
                                  } else {
                                    setDealers([]);
                                  }
                                }}
                              />
                            </FormControl>
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center mt-8 gap-4">
                      <div className="w-px h-8 bg-gray-300"></div>
                      <span className="text-gray-500 font-medium">OR</span>
                      <Button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={isDetectingLocation}
                        className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                      >
                        {isDetectingLocation ? (
                          <div className="flex items-center">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            <span>Detecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>Detect Location</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Dealer Selection */}
                  <FormField
                    control={form.control}
                    name="dealer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Select Nearest Dealer
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={dealers.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12">
                              <SelectValue placeholder="Select a dealer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dealers.map((dealer) => (
                              <SelectItem key={dealer.id} value={dealer.id}>
                                {dealer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Vehicle Details */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Vehicle Details
                  </h3>

                  {/* Vehicle Selection */}
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Vehicle</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12">
                              <SelectValue placeholder="Select a vehicle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicles.map((vehicle) => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Variant Selection */}
                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Variant</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={variants.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12">
                              <SelectValue placeholder="Select a variant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {variants.map((variant) => (
                              <SelectItem key={variant.id} value={variant.id}>
                                {variant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="interestedInOffers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-gray-50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700">
                              I am interested in offers and schemes from TVS
                              Motors
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="authorizeContact"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-gray-50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700">
                              I authorize TVS Motors to contact me via SMS,
                              email, and phone calls regarding my test ride
                              request and other promotional activities
                            </FormLabel>
                            <FormDescription>
                              This is required to process your test ride request
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Add ReCAPTCHA only on the last step */}
                  <div className="mt-6">
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""}
                      onChange={handleCaptchaChange}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={activeStep === 1}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                >
                  Back
                </Button>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                  >
                    Reset
                  </Button>

                  {activeStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isCurrentStepValid()}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                    >
                      <span>Continue</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isCurrentStepValid()}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        "Book Test Ride"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
