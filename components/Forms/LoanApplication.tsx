"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, DollarSign } from "lucide-react";

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

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  employmentStatus: z
    .string()
    .min(1, { message: "Please select your employment status" }),
  annualIncome: z.coerce
    .number()
    .positive({ message: "Annual income must be greater than 0" }),
  loanAmount: z.coerce
    .number()
    .positive({ message: "Loan amount must be greater than 0" }),
  loanTenure: z.coerce
    .number()
    .int()
    .positive({ message: "Loan tenure must be a positive number" }),
  residentialAddress: z
    .string()
    .min(10, { message: "Please provide your complete address" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoanApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
    },
  });

  // Update date in form when it changes
  React.useEffect(() => {
    if (dateOfBirth) {
      form.setValue("dateOfBirth", dateOfBirth, { shouldValidate: true });
    }
  }, [dateOfBirth, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    console.log("Form data:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    form.reset();
    setDateOfBirth(undefined);
    alert("Loan application submitted successfully!");
  };

  return (
    <FormWrapper
      title="Vehicle Loan Application"
      description="Apply for a vehicle loan with competitive interest rates"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
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
