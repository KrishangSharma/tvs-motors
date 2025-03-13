"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Calendar } from "lucide-react";

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
import { TimePicker } from "@/components/ui/time-picker";
import { FormWrapper } from "../FormWrapper";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  vehicleModel: z.string().min(1, { message: "Please select a vehicle model" }),
  bookingDate: z.date({
    required_error: "Please select a booking date",
  }),
  timeSlot: z.string().min(1, { message: "Please select a time slot" }),
  additionalComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookVehicleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleModel: "",
      additionalComments: "",
    },
  });

  // Update form values when date and time change
  React.useEffect(() => {
    if (bookingDate) {
      form.setValue("bookingDate", bookingDate, { shouldValidate: true });
    }
    if (timeSlot) {
      form.setValue("timeSlot", timeSlot, { shouldValidate: true });
    }
  }, [bookingDate, timeSlot, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    console.log("Form data:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    form.reset();
    setBookingDate(undefined);
    setTimeSlot(undefined);
    alert("Test ride booked successfully!");
  };

  // Sample vehicle models (would typically come from an API)
  const vehicleModels = [
    "TVS Apache RR 310",
    "TVS Apache RTR 200 4V",
    "TVS Ronin",
    "TVS Jupiter",
    "TVS NTORQ",
    "TVS iQube Electric",
    "TVS Raider",
    "TVS XL100",
  ];

  return (
    <FormWrapper
      title="Book a Test Ride"
      description="Schedule a test ride for your preferred vehicle model"
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

          <FormField
            control={form.control}
            name="vehicleModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Vehicle Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="bookingDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Booking Date</FormLabel>
                  <DatePicker
                    date={bookingDate}
                    setDate={setBookingDate}
                    placeholder="Select date"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSlot"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time Slot</FormLabel>
                  <TimePicker
                    time={timeSlot}
                    setTime={setTimeSlot}
                    placeholder="Select time"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific requirements or questions"
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
                Booking...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Book Test Ride
              </>
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
