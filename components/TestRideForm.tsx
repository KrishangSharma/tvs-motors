"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Check,
  Loader2,
  Phone,
  Mail,
  LifeBuoy,
  MapPin,
  ChevronRight,
} from "lucide-react";
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
import Heading from "./Heading";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must not exceed 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  otp: z
    .string()
    .min(4, { message: "OTP must be at least 4 digits" })
    .max(6, { message: "OTP must not exceed 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only digits" }),
  pincode: z
    .string()
    .min(6, { message: "Pincode must be 6 digits" })
    .max(6, { message: "Pincode must be 6 digits" })
    .regex(/^\d+$/, { message: "Pincode must contain only digits" }),
  vehicle: z.string().min(1, { message: "Please select a vehicle" }),
  variant: z.string().min(1, { message: "Please select a variant" }),
  dealer: z.string().min(1, { message: "Please select a dealer" }),
  interestedInOffers: z.boolean().default(false),
  authorizeContact: z
    .boolean()
    .default(true)
    .refine((val) => val === true, {
      message: "You must authorize TVS Motors to contact you",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TestRideForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = React.useState(false);
  const [sendingOtp, setSendingOtp] = React.useState(false);
  const [verifyingOtp, setVerifyingOtp] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);

  // Contact info data
  const contactInfo = [
    { title: "CONTACT", icon: Phone, content: "18002587555" },
    { title: "EMAIL", icon: Mail, content: "customercare@tvsmotor.com" },
    {
      title: "NEED ROAD SIDE ASSISTANCE?",
      icon: LifeBuoy,
      content: 'Dial 1800-258-7111 and Press "1"',
    },
  ];

  const socialLinks = [
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
    console.log(pincode);
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
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    setIsSubmitting(false);

    // Reset form after successful submission
    form.reset();
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setActiveStep(1);
  };

  // Handle OTP sending
  const handleSendOTP = async () => {
    setSendingOtp(true);
    const phoneValue = form.getValues("phone");
    const phoneResult = z
      .string()
      .min(10)
      .max(10)
      .regex(/^\d+$/)
      .safeParse(phoneValue);

    if (phoneResult.success) {
      try {
        const res = await fetch("/api/generate-otp", {
          method: "POST",
          body: JSON.stringify({ phone: phoneValue }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          setSendingOtp(false);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setIsOtpSent(true);
        setSendingOtp(false);
      } catch (error) {
        setSendingOtp(false);
        console.error("Failed to send OTP:", error);
        form.setError("phone", {
          type: "manual",
          message: "Failed to send OTP. Please try again.",
        });
      }
    } else {
      setSendingOtp(false);
      form.setError("phone", {
        type: "manual",
        message: "Please enter a valid 10-digit phone number",
      });
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    setVerifyingOtp(true);
    const otpValue = form.getValues("otp");
    const phoneValue = form.getValues("phone");
    const otpResult = z
      .string()
      .min(4)
      .max(6)
      .regex(/^\d+$/)
      .safeParse(otpValue);

    if (otpResult.success) {
      try {
        const res = await fetch("/api/verify-otp", {
          method: "POST",
          body: JSON.stringify({ otp: otpValue, phone: phoneValue }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          setVerifyingOtp(false);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setVerifyingOtp(false);
        setIsOtpVerified(true);
      } catch (error) {
        setVerifyingOtp(false);
        console.error("Failed to verify OTP:", error);
        form.setError("otp", {
          type: "manual",
          message: "Failed to verify OTP. Please try again.",
        });
      }
    } else {
      setVerifyingOtp(false);
      form.setError("otp", {
        type: "manual",
        message: "Please enter a valid OTP",
      });
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
    setIsOtpSent(false);
    setIsOtpVerified(false);
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
          form.getValues("phone") !== "" &&
          form.getValues("phone").length === 10 &&
          isOtpVerified
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
          form.getValues("authorizeContact") === true
        );
      default:
        return false;
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h3>

                  {/* Name Field */}
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
                          <div className="flex">
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Enter your mobile number"
                                {...field}
                                autoComplete="off"
                                maxLength={10}
                                className={`rounded-r-none bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 ${
                                  isOtpSent
                                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                                    : ""
                                }`}
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
                            <Button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={
                                sendingOtp ||
                                isOtpSent ||
                                !form.getValues("phone") ||
                                form.getValues("phone").length !== 10
                              }
                              className={`rounded-l-none h-12 px-4 ${
                                isOtpSent
                                  ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                            >
                              {sendingOtp ? (
                                <div className="flex items-center">
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  <span>Sending...</span>
                                </div>
                              ) : (
                                <>{isOtpSent ? "Resend OTP" : "Send OTP"}</>
                              )}
                            </Button>
                          </div>
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
                          <div className="flex">
                            <FormControl>
                              <Input
                                placeholder="Enter OTP"
                                {...field}
                                disabled={!isOtpSent}
                                autoComplete="off"
                                maxLength={6}
                                className={`rounded-r-none bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12 ${
                                  isOtpVerified
                                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                                    : ""
                                }`}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              onClick={handleVerifyOTP}
                              disabled={
                                verifyingOtp ||
                                !isOtpSent ||
                                isOtpVerified ||
                                !form.getValues("otp") ||
                                form.getValues("otp").length < 4
                              }
                              className={`rounded-l-none h-12 px-4 ${
                                isOtpVerified
                                  ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                            >
                              {verifyingOtp ? (
                                <div className="flex items-center">
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  <span>Verifying...</span>
                                </div>
                              ) : (
                                <>
                                  {isOtpVerified ? (
                                    <div className="flex items-center">
                                      <Check className="w-4 h-4 mr-2" />
                                      <span>Verified</span>
                                    </div>
                                  ) : (
                                    "Verify"
                                  )}
                                </>
                              )}
                            </Button>
                          </div>
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
