import { z } from "zod";

// AMC Form Schema
export const amcFormSchema = z.object({
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

// Career Form Schema
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const careerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  // resume: z
  //   .instanceof(FileList)
  //   .refine((files) => files.length > 0, "Resume is required")
  //   .refine(
  //     (files) => files[0]?.size <= MAX_FILE_SIZE,
  //     "File size must be less than 5MB"
  //   )
  //   .refine(
  //     (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
  //     "Only PDF and DOC/DOCX files are accepted"
  //   ),
  interestedProfile: z
    .string()
    .min(1, { message: "Please select an interested profile" }),
  coverLetter: z.string().optional(),
});

// EMI Form Schema
export const emiFormSchema = z.object({
  loanAmount: z.coerce
    .number()
    .positive({ message: "Loan amount must be greater than 0" }),
  interestRate: z.coerce
    .number()
    .positive({ message: "Interest rate must be greater than 0" }),
  loanTenure: z.coerce
    .number()
    .int()
    .positive({ message: "Loan tenure must be a positive number" }),
});

// Exchange Form Schema
export const exchangeFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  currentVehicleMake: z
    .string()
    .min(1, { message: "Vehicle make is required" }),
  currentVehicleModel: z
    .string()
    .min(1, { message: "Vehicle model is required" }),
  currentVehicleYear: z.string().min(4, { message: "Valid year is required" }),
  currentVehicleRegistration: z
    .string()
    .min(1, { message: "Registration number is required" }),
  desiredVehicleDetails: z
    .string()
    .min(5, { message: "Please provide details about your desired vehicle" }),
  additionalComments: z.string().optional(),
});

// Express Service Form Schema
export const expressServiceFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
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
  serviceType: z.enum(["free", "paid"], {
    required_error: "Please select a service type.",
  }),
  pickupRequired: z.enum(["yes", "no"], {
    required_error: "Please select if pickup is required.",
  }),
  bookingDate: z.date({
    required_error: "Please select a booking date.",
  }),
  bookingTime: z.string({
    required_error: "Please select a booking time.",
  }),
});

// Generic Payment Form Schema
export const genericPaymentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  serviceDescription: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0" }),
  additionalInfo: z.string().optional(),
});

// Insurance Renewal Form Schema
export const insuranceRenewalFormSchema = z.object({
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

// Loan Form Schema
export const loanFormSchema = z.object({
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

// Service Booking Form Schema
export const serviceFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
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
  serviceType: z.enum(["free", "paid"], {
    required_error: "Please select a service type.",
  }),
  pickupRequired: z.enum(["yes", "no"], {
    required_error: "Please select if pickup is required.",
  }),
  bookingDate: z.date({
    required_error: "Please select a booking date.",
  }),
  bookingTime: z.string({
    required_error: "Please select a booking time.",
  }),
});

// Suggestion Form Schema
export const suggestionFormSchema = z.object({
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

// Test Ride Form Schema
export const testRideFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must not exceed 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  otp: z
    .string()
    .min(4, { message: "OTP must be at least 4 digits" })
    .max(6, { message: "OTP must not exceed 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only digits" }),
  pincode: z
    .string()
    .min(6, { message: "Pincode must be 6 digits" })
    .max(6, { message: "Pincode must be 6 digits" })
    .regex(/^\d+$/, { message: "Pincode must contain only digits" }),
  vehicle: z.string().min(1, { message: "Please select a vehicle" }),
  variant: z.string().min(1, { message: "Please select a variant" }),
  dealer: z.string().min(1, { message: "Please select a dealer" }),
  interestedInOffers: z.boolean().default(false),
  authorizeContact: z
    .boolean()
    .default(true)
    .refine((val) => val === true, {
      message: "You must authorize TVS Motors to contact you",
    }),
});
