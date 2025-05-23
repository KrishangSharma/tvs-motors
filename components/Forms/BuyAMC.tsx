"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { FormWrapper } from "../FormWrapper";
import ReCAPTCHA from "react-google-recaptcha";
import { amcFormSchema } from "@/lib/formSchemas";
import { toast } from "sonner";

type FormValues = z.infer<typeof amcFormSchema>;

interface VehicleData {
  model: string;
  variants?: {
    variantName: string;
  }[];
}

export default function BuyAMCForm({
  vehicleData,
}: {
  vehicleData: VehicleData[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(amcFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      registrationNumber: "",
      amcPackage: "",
      startDate: undefined,
      additionalComments: "",
    },
  });

  // Set the date in the form when it changes
  React.useEffect(() => {
    if (startDate) {
      form.setValue("startDate", startDate, { shouldValidate: true });
    }
  }, [startDate, form]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData = form.getValues();

      const response = await fetch("/api/submit-amc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      // Reset form and states regardless of API call
      setIsSubmitting(false);
      captchaRef.current?.reset();
      setCaptchaValue("");
      setStartDate(undefined);
      form.reset();

      if (formData.email && formData.email !== "") {
        toast.success(
          "Your query has been recieved and an email has been sent to you."
        );
      } else {
        toast.success("Your query has been recieved!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Form submission failed");
      setIsSubmitting(false);
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
      toast.error("Captcha verification failed");
      setIsCaptchaVerified(false);
      throw new Error("Captcha verification failed");
    }
    setIsCaptchaVerified(true);
  };

  return (
    <FormWrapper
      title="Get Annual Maintenance Contract (AMC)"
      description="Purchase an AMC for your vehicle with easy payment options"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle owner's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Your contact number"
                      {...field}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="vehicleMake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Make</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle make" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleData.map((vehicle, idx) => (
                        <SelectItem key={idx} value={vehicle.model}>
                          {vehicle.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter vehicle registration number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="amcPackage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>AMC Package Selection</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="basic" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Basic (₹4,999/year) - Includes regular servicing and
                        basic parts replacement
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="standard" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Standard (₹7,999/year) - Includes all Basic features
                        plus extended warranty on parts
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="premium" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Premium (₹11,999/year) - Comprehensive coverage with
                        roadside assistance and priority service
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>AMC Start Date</FormLabel>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  disablePastDates={true}
                  placeholder="Select start date"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific requirements or details about your vehicle"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""}
            onChange={handleCaptchaChange}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isCaptchaVerified}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </>
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
