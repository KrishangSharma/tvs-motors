"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, DollarSign } from "lucide-react";
import { toast } from "sonner";

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
import { DatePicker } from "@/components/ui/date-picker";
import { FormWrapper } from "../FormWrapper";
import ReCAPTCHA from "react-google-recaptcha";
import { loanFormSchema } from "@/lib/formSchemas";

type FormValues = z.infer<typeof loanFormSchema>;

export default function LoanApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");

  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      employmentStatus: "",
      annualIncome: 0,
      loanAmount: 0,
      loanTenure: 0,
      residentialAddress: "",
      additionalInfo: "",
      documentType: "",
      documentNumber: "",
    },
  });

  // Update date in form when it changes
  React.useEffect(() => {
    if (dateOfBirth) {
      form.setValue("dateOfBirth", dateOfBirth, { shouldValidate: true });
    }
  }, [dateOfBirth, form]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/loan-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      setIsSubmitting(false);
      form.reset({
        fullName: "",
        email: "",
        phone: "",
        employmentStatus: "",
        annualIncome: 0,
        loanAmount: 0,
        loanTenure: 0,
        residentialAddress: "",
        additionalInfo: "",
        dateOfBirth: undefined,
        documentType: "",
        documentNumber: "",
      });
      setDateOfBirth(undefined);
      captchaRef.current?.reset();

      const email = form.getValues("email");
      if (email && email.trim() !== "") {
        toast.success(
          "Loan application submitted successfully! Check your email for updates."
        );
      } else {
        toast.success(
          "Thank you for your time! We have recieved your application!"
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      toast.error("Failed to submit loan application. Please try again.");
    }
  };

  const handleCaptchaChange = async (value: string | null) => {
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

  // Custom handler for phone number to only allow digits
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update if the value contains only digits
    if (value === "" || /^\d+$/.test(value)) {
      form.setValue("phone", value);
    }
  };

  // Custom handler for document number based on document type
  const handleDocumentNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const documentType = form.getValues("documentType");

    if (!documentType) {
      form.setValue("documentNumber", value);
      return;
    }

    if (documentType === "adhaar") {
      // Only allow digits for Adhaar
      if (value === "" || /^\d+$/.test(value)) {
        form.setValue("documentNumber", value);
      }
    } else if (documentType === "pan") {
      // Allow alphanumeric for PAN, uppercase
      if (value === "" || /^[A-Z0-9]*$/.test(value)) {
        form.setValue("documentNumber", value.toUpperCase());
      }
    }
  };

  // Handle document type change
  const handleDocumentTypeChange = (value: string) => {
    setSelectedDocumentType(value);
    form.setValue("documentType", value);
    form.setValue("documentNumber", ""); // Reset document number when type changes
  };

  return (
    <FormWrapper
      title="Vehicle Loan Application"
      description="Apply for a vehicle loan with competitive interest rates"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <DatePicker
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                    placeholder="Select date"
                    disableFutureDates
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">
                        Self-Employed
                      </SelectItem>
                      <SelectItem value="business-owner">
                        Business Owner
                      </SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="annualIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income (₹)</FormLabel>
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
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount (₹)</FormLabel>
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
              name="loanTenure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Tenure (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter years"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? "0" : e.target.value;
                        field.onChange(Number.parseInt(value, 10));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your complete residential address"
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
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other details that might support your application"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type (Optional)</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDocumentTypeChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="adhaar">Adhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Document Number{" "}
                    {selectedDocumentType ? "(Required)" : "(Optional)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        selectedDocumentType === "adhaar"
                          ? "Enter 12-digit Adhaar number"
                          : selectedDocumentType === "pan"
                            ? "Enter 10-character PAN number"
                            : "Enter document number"
                      }
                      {...field}
                      onChange={handleDocumentNumberChange}
                      maxLength={
                        selectedDocumentType === "adhaar"
                          ? 12
                          : selectedDocumentType === "pan"
                            ? 10
                            : undefined
                      }
                      disabled={
                        !selectedDocumentType || selectedDocumentType === "none"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                Submitting Application...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                Submit Loan Application
              </>
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
