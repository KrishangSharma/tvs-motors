"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { FormWrapper } from "../FormWrapper";
import ReCAPTCHA from "react-google-recaptcha";

const formSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
  rating: z.number().min(0).max(5).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SuggestionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      rating: 0,
    },
  });

  // Update rating in form when it changes
  React.useEffect(() => {
    form.setValue("rating", rating);
  }, [rating, form]);

  const handleSubmit = async () => {
    // Check if captcha is verified
    if (!captchaValue) {
      // Show error or alert
      console.error("Please complete the captcha verification");
      return;
    }
    const formData = form.getValues();
    setIsSubmitting(true);
    try {
      // First verify the captcha
      const captchaResponse = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha: captchaValue }),
      });
      if (!captchaResponse.ok) {
        throw new Error("Captcha verification failed");
      } // Rest of form submission logic would go here
      setIsSubmitting(false);
      form.reset();
      captchaRef.current?.reset();
      setCaptchaValue("");
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value || "");
  };

  return (
    <FormWrapper
      title="Suggestion & Feedback"
      description="We value your input to help us improve our services"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <FormLabel>Email Address (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We&apos;ll only use this to follow up if needed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief title for your suggestion"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suggestion / Feedback Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share your detailed feedback or suggestion"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <FormLabel>Rate Your Experience (Optional)</FormLabel>
                <FormControl>
                  <StarRating rating={rating} setRating={setRating} />
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
              "Submit Feedback"
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
