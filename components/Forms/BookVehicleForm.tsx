"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dealershipFormSchema } from "@/lib/formSchemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Motorcycle as MotorcycleType,
  Variant,
  Color,
} from "@/VehicleTypes/VehicleTypes";

const dealerships = [
  "Rithala",
  "Budh Vihar",
  "Peeragarhi",
  "Rama Road",
  "Karol Bagh",
  "Raja Garden",
];

export type DealershipFormValues = z.infer<typeof dealershipFormSchema>;

interface DealershipFormProps {
  className?: string;
  vehicle: MotorcycleType;
  selectedVariant?: Variant | null;
  selectedColor?: Color | null;
  onSuccess?: () => void;
  onBack: () => void;
  activeStep: number;
}

export default function BookVehicleForm({
  className = "",
  vehicle,
  selectedVariant,
  selectedColor,
  onSuccess,
  onBack,
}: DealershipFormProps) {
  const form = useForm<DealershipFormValues>({
    resolver: zodResolver(dealershipFormSchema),
    defaultValues: {
      dealership: "",
      mobileNumber: "",
      fullName: "",
      emailId: "",
      marketingConsent: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: DealershipFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!vehicle || !selectedVariant || !selectedColor) {
        throw new Error("Vehicle details are incomplete");
      }

      const formData = {
        ...data,
        vehicle: {
          model: vehicle.model,
          variant: selectedVariant.variantName,
          color: selectedColor.name,
        },
      };

      console.log("Form validation passed, submitting data:", formData);

      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit booking");
      }

      form.reset();
      toast.success("Vehicle booking successful!");
      onSuccess?.();
    } catch (error) {
      console.error("Booking error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      toast.error("Booking failed! Try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            Select Dealership
          </h2>

          {/* Dealership Field */}
          <FormField
            control={form.control}
            name="dealership"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium after:content-['*'] after:text-red-500 after:ml-0.5">
                  Dealership
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-white border-slate-200 h-12 pl-4 text-slate-500 focus:ring-1 focus:ring-blue-500">
                      <SelectValue placeholder="Select Dealership" />
                    </SelectTrigger>
                    <SelectContent>
                      {dealerships.map((dealership) => (
                        <SelectItem key={dealership} value={dealership}>
                          {dealership}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Enter personal details
            </h2>

            {/* Mobile Number Field */}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-6">
                  <FormLabel className="text-sm font-medium after:content-['*'] after:text-red-500 after:ml-0.5">
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. 9435678990"
                      className="h-12 pl-4 bg-white border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Marketing Consent Checkbox */}
            <FormField
              control={form.control}
              name="marketingConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-slate-600">
                      Yes, I would like to receive updates on marketing
                      communication via email, whatsapp, SMS by TVS Motor
                      Company and its partners
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1 mb-6">
                  <FormLabel className="text-sm font-medium after:content-['*'] after:text-red-500 after:ml-0.5">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Neha Sharma"
                      className="h-12 pl-4 bg-white border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Email ID Field */}
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium ">
                    Email ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="e.g. neha@gmail.com"
                      className="h-12 pl-4 bg-white border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-between gap-5">
            <Button
              variant="outline"
              className="w-full h-12 mt-8 font-medium"
              disabled={isSubmitting}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
