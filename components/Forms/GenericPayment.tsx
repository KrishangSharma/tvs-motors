"use client";

import { useRef, useState } from "react";
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
import { FormWrapper } from "../FormWrapper";
import ReCAPTCHA from "react-google-recaptcha";
import { genericPaymentFormSchema } from "@/lib/formSchemas";

type FormValues = z.infer<typeof genericPaymentFormSchema>;

export default function GenericPaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(genericPaymentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceDescription: "",
      amount: 0,
      additionalInfo: "",
    },
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/generic-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
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
      title="Service Payment"
      description="Complete your payment for services or products"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="serviceDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service/Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the service or product you're paying for"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? "0" : e.target.value;
                      field.onChange(Number.parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other details or special instructions"
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
