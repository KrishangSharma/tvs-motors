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

const formSchema = z.object({
  ownerName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  vehicleMake: z.string().min(1, { message: "Please select a vehicle make" }),
  vehicleModel: z.string().min(1, { message: "Please select a vehicle model" }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration number is required" }),
  amcPackage: z.string().min(1, { message: "Please select an AMC package" }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  additionalComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BuyAMCForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      registrationNumber: "",
      amcPackage: "",
      additionalComments: "",
    },
  });

  // Set the date in the form when it changes
  React.useEffect(() => {
    if (startDate) {
      form.setValue("startDate", startDate, { shouldValidate: true });
    }
  }, [startDate, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    console.log("Form data:", data);

    // In a real application, you would handle payment gateway integration here
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    form.reset();
    setStartDate(undefined);
    alert("AMC purchased successfully!");
  };

  // Vehicle makes and models (would typically come from an API)
  const vehicleMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Hyundai",
    "Maruti Suzuki",
    "Tata",
    "Mahindra",
  ];

  const getVehicleModels = (make: string) => {
    const models: Record<string, string[]> = {
      Toyota: ["Corolla", "Camry", "Fortuner", "Innova"],
      Honda: ["City", "Civic", "Accord", "Amaze"],
      Ford: ["EcoSport", "Endeavour", "Figo", "Aspire"],
      Hyundai: ["i10", "i20", "Creta", "Venue"],
      "Maruti Suzuki": ["Swift", "Baleno", "Dzire", "Ertiga"],
      Tata: ["Nexon", "Harrier", "Safari", "Tiago"],
      Mahindra: ["XUV700", "Scorpio", "Thar", "XUV300"],
    };
    return models[make] || [];
  };

  const [vehicleModels, setVehicleModels] = useState<string[]>([]);

  // Update models when make changes
  React.useEffect(() => {
    const make = form.watch("vehicleMake");
    if (make) {
      setVehicleModels(getVehicleModels(make));
      form.setValue("vehicleModel", ""); // Reset model when make changes
    }
  }, [form.watch("vehicleMake"), form]);

  return (
    <FormWrapper
      title="Buy Annual Maintenance Contract (AMC)"
      description="Purchase an AMC for your vehicle with easy payment options"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle make" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleMakes.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
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
              name="vehicleModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={vehicleModels.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <FormField
            control={form.control}
            name="amcPackage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>AMC Package Selection</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>AMC Start Date</FormLabel>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
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
