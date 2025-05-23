"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Car, User, Phone, Mail, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { serviceFormSchema } from "@/lib/formSchemas";
import { DatePicker } from "../ui/date-picker";

type FormValues = z.infer<typeof serviceFormSchema>;

// Available time slots
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

interface VehicleData {
  model: string;
  variants?: {
    variantName: string;
  }[];
}

export default function OnlineServiceBookingForm({
  vehicleData,
}: {
  vehicleData: VehicleData[];
}) {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date>();

  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      emailId: "",
      model: "",
      registrationNumber: "",
      serviceType: undefined,
      pickupRequired: undefined,
      bookingTime: "",
    },
  });

  useEffect(() => {
    if (bookingDate) {
      form.setValue("bookingDate", bookingDate);
    }
  }, [bookingDate, form]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/online-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      setIsSubmitting(false);
      // Reset form values
      form.reset({
        name: "",
        contactNumber: "",
        emailId: "",
        model: "",
        registrationNumber: "",
        serviceType: "",
        pickupRequired: " ",
        bookingTime: "",
        bookingDate: undefined,
      });
      // Reset component states
      setBookingDate(undefined);
      captchaRef.current?.reset();
      setCaptchaValue("");
      setIsCaptchaVerified(false);
      toast.success("Service booking request submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      toast.error(
        "Failed to submit service booking request. Please try again."
      );
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

  // Custom handler for phone number to only allow digits
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update if the value contains only digits
    if (value === "" || /^\d+$/.test(value)) {
      form.setValue("contactNumber", value);
    }
  };

  return (
    <div className="flex justify-center p-4 w-full">
      <Card className="w-full max-w-2xl md:border-none md:shadow-none shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1  rounded-t-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              Online Service Booking
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Schedule your vehicle service appointment online with ease.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="grid gap-6 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Separator />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Contact Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
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

              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Vehicle Information</h3>
                <Separator />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Car className="h-4 w-4" /> Vehicle Model
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select vehicle model" />
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
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Registration Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="MH02AB1234" {...field} />
                      </FormControl>
                      <FormDescription>Format: MH02AB1234</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Service Details</h3>
                <Separator />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="free">Free Service</SelectItem>
                          <SelectItem value="paid">Paid Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupRequired"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Pick up & drop off required</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Service Booking Date</FormLabel>
                      <DatePicker
                        date={bookingDate}
                        setDate={setBookingDate}
                        placeholder="Select date"
                        disablePastDates
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Booking Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""}
                  onChange={handleCaptchaChange}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 rounded-b-lg">
              <Button
                type="submit"
                className="w-full"
                disabled={!isCaptchaVerified || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
