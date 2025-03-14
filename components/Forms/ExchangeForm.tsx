"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, RefreshCw } from "lucide-react";

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
import { FormWrapper } from "../FormWrapper";
import ReCAPTCHA from "react-google-recaptcha";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  currentVehicleMake: z
    .string()
    .min(1, { message: "Vehicle make is required" }),
  currentVehicleModel: z
    .string()
    .min(1, { message: "Vehicle model is required" }),
  currentVehicleYear: z.string().min(4, { message: "Valid year is required" }),
  currentVehicleRegistration: z
    .string()
    .min(1, { message: "Registration number is required" }),
  desiredVehicleDetails: z
    .string()
    .min(5, { message: "Please provide details about your desired vehicle" }),
  additionalComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExchangeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentVehicleMake: "",
      currentVehicleModel: "",
      currentVehicleYear: "",
      currentVehicleRegistration: "",
      desiredVehicleDetails: "",
      additionalComments: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = form.getValues();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      setIsSubmitting(false);
      form.reset();
      captchaRef.current?.reset();
      setCaptchaValue("");
    } catch (error) {
      console.error("Form submission error:", error);
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
      setIsCaptchaVerified(false);
      throw new Error("Captcha verification failed");
    }
    setIsCaptchaVerified(true);
  };

  return (
    <FormWrapper
      title="Vehicle Exchange"
      description="Submit your current vehicle details for an exchange offer"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Vehicle Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentVehicleMake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Honda, Toyota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentVehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Civic, Corolla" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentVehicleYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2018" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentVehicleRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vehicle registration number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="desiredVehicleDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Vehicle/Exchange Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the vehicle you're interested in exchanging for"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other details about your exchange requirements"
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Submit Exchange Request
              </>
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
