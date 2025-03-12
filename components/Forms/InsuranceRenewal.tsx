"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Generate years for the dropdown (current year down to 20 years ago)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) =>
  (currentYear - i).toString()
);

// Define the form schema with Zod
const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  contactNumber: z.string().regex(/^\d{10}$/, {
    message: "Contact number must be 10 digits.",
  }),
  emailId: z.string().email({
    message: "Please enter a valid email address.",
  }),
  model: z.string().min(1, {
    message: "Vehicle model is required.",
  }),
  registrationNumber: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, {
    message: "Please enter a valid registration number (e.g., MH02AB1234).",
  }),
  registrationYear: z.string({
    required_error: "Please select a registration year.",
  }),
  previousInsuranceCompany: z.string().min(1, {
    message: "Previous insurance company is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function InsuranceRenewalForm() {
  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      contactNumber: "",
      emailId: "",
      model: "",
      registrationNumber: "",
      registrationYear: "",
      previousInsuranceCompany: "",
    },
  });

  // Handle form submission
  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
  }

  return (
    <div className="flex justify-center p-4 w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Insurance Renewal Request
          </CardTitle>
          <CardDescription>
            Please fill in your details to renew your insurance policy.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
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
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
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
                    <FormLabel>Email ID</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Honda City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number</FormLabel>
                      <FormControl>
                        <Input placeholder="MH02AB1234" {...field} />
                      </FormControl>
                      <FormDescription>Format: MH02AB1234</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="registrationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
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
                  name="previousInsuranceCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Insurance Company</FormLabel>
                      <FormControl>
                        <Input placeholder="ACME Insurance" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit Renewal Request
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
