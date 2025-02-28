"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, Loader2 } from "lucide-react";
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
    const vehicleId = form.watch("vehicle");
    if (vehicleId) {
      setVariants(getVariants(vehicleId));
      form.setValue("variant", ""); // Reset variant when vehicle changes
    }
  }, [form.watch("vehicle"), form.setValue, getVariants]);

  // Handle pincode change to update dealers
  React.useEffect(() => {
    const pincode = form.watch("pincode");
    if (pincode && pincode.length === 6) {
      setDealers(getDealers(pincode));
    }
  }, [form.watch("pincode"), getDealers]);

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
  };

  // Handle OTP sending
  const handleSendOTP = async () => {
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
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setIsOtpSent(true);
      } catch (error) {
        console.error("Failed to send OTP:", error);
        form.setError("phone", {
          type: "manual",
          message: "Failed to send OTP. Please try again.",
        });
      }
    } else {
      form.setError("phone", {
        type: "manual",
        message: "Please enter a valid 10-digit phone number",
      });
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
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
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setIsOtpVerified(true);
      } catch (error) {
        console.error("Failed to verify OTP:", error);
        form.setError("otp", {
          type: "manual",
          message: "Failed to verify OTP. Please try again.",
        });
      }
    } else {
      form.setError("otp", {
        type: "manual",
        message: "Please enter a valid OTP",
      });
    }
  };

  // Handle location detection //! Probably via google maps
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
  };

  return (
    <div className="flex justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone and OTP Fields - Side by side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your mobile number"
                          {...field}
                          maxLength={10}
                          className="rounded-r-none"
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/\D/g, ""); // Remove non-digits
                            field.onChange(e); // Update form state
                          }}
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                              e.preventDefault(); // Prevent typing non-numeric characters
                            }
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleSendOTP}
                        disabled={
                          isOtpSent ||
                          !form.getValues("phone") ||
                          form.getValues("phone").length !== 10
                        }
                        className="rounded-l-none border border-l-0 border-input"
                      >
                        {isOtpSent ? "Resend" : "Send OTP"}
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
                    <FormLabel>OTP</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input
                          placeholder="Enter OTP"
                          {...field}
                          disabled={!isOtpSent}
                          maxLength={6}
                          className="rounded-r-none"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleVerifyOTP}
                        disabled={
                          !isOtpSent ||
                          isOtpVerified ||
                          !form.getValues("otp") ||
                          form.getValues("otp").length < 4
                        }
                        className="rounded-l-none border border-l-0 border-input"
                      >
                        {isOtpVerified ? (
                          <Check className="h-4 w-4 text-green-700" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pincode with Detect Button */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-1/2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter Pincode"
                    value={form.watch("pincode")}
                    // onChange={(e) => handlePincodeChange(e.target.value)}
                  />
                </div>

                {/* Suggested Pincode List */}
                {/* {suggestedPincodes.length > 0 && (
                  <div className="bg-gray-100 p-2 rounded-md">
                    <strong>Suggested Pincodes:</strong>
                    <ul>
                      {suggestedPincodes.map((pincode, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer hover:bg-gray-200 p-1 rounded"
                          onClick={() => form.setValue("pincode", pincode)}
                        >
                          {pincode}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>

              <div className="flex items-center mt-6 gap-2">
                <span className="text-muted-foreground">OR</span>
                <Button
                  type="button"
                  onClick={handleDetectLocation}
                  // disabled={isDetectingLocation}
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    "Detect Location"
                  )}
                </Button>
              </div>
            </div>

            {/* Vehicle Selection */}
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                  <FormLabel>Variant</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={variants.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
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

            {/* Dealer Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dealer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={dealers.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
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

            {/* Checkboxes */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="interestedInOffers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I am interested in offers and schemes from TVS Motors
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="authorizeContact"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I authorize TVS Motors to contact me via SMS, email, and
                        phone calls regarding my test ride request and other
                        promotional activities
                      </FormLabel>
                      <FormDescription>
                        This is required to process your test ride request
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting || !isOtpVerified}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
