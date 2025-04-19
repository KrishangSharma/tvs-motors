"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormWrapper } from "../FormWrapper";
import { careerFormSchema } from "@/lib/formSchemas";
import FileUpload from "@/components/FileUpload";

type FormValues = z.infer<typeof careerFormSchema>;

export default function CareerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resetFileUpload, setResetFileUpload] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interestedProfile: "",
      coverLetter: "",
    },
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const values = form.getValues();

      // Append form fields to FormData
      formData.append("fullName", values.fullName);
      formData.append("email", values.email || "");
      formData.append("phone", values.phone);
      formData.append("interestedProfile", values.interestedProfile);
      if (values.coverLetter) {
        formData.append("coverLetter", values.coverLetter);
      }

      // Append the file from our FileUpload component
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const response = await fetch("/api/career-application", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      // Always reset the form after successful submission
      form.reset({
        fullName: "",
        email: "",
        phone: "",
        interestedProfile: "",
        coverLetter: "",
      });

      // Reset file upload by toggling the reset state
      setResumeFile(null);
      setResetFileUpload(true);

      captchaRef.current?.reset();

      // Check if email was provided for different success messages
      const hasEmail = values.email && values.email.trim() !== "";
      if (hasEmail) {
        toast.success(
          "Application submitted successfully! We'll review your application and get back to you."
        );
        setIsSubmitting(false);
      } else {
        toast.success(
          "Application submitted successfully! We'll review your application."
        );
      }

      // Reset the reset trigger after a short delay
      setTimeout(() => {
        setResetFileUpload(false);
      }, 100);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = async (value: string | null) => {
    const captchaResponse = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ captcha: value }),
    });

    if (!captchaResponse.ok) {
      setIsCaptchaVerified(false);
      throw new Error("Captcha verification failed");
    }
    setIsCaptchaVerified(true);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update if the value contains only digits
    if (value === "" || /^\d+$/.test(value)) {
      form.setValue("phone", value);
    }
  };

  return (
    <FormWrapper
      title="Career Application"
      description="Submit your resume and contact information for job opportunities"
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
                      onChange={handlePhoneNumberChange}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel>Resume</FormLabel>
            <FormControl>
              <FileUpload
                onFileChange={setResumeFile}
                accept=".pdf,.doc,.docx"
                label="Drag & drop your resume here or click to select"
                value={resumeFile}
                reset={resetFileUpload}
              />
            </FormControl>
            <FormDescription>
              Upload your resume in PDF or DOC format (max 5MB)
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="interestedProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interested Profile</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job profile" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="fullstack">
                      Full Stack Developer
                    </SelectItem>
                    <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                    <SelectItem value="product">Product Manager</SelectItem>
                    <SelectItem value="qa">QA Engineer</SelectItem>
                    <SelectItem value="devops">DevOps Engineer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you're interested in this position and what makes you a good fit"
                    className="min-h-[120px]"
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
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
