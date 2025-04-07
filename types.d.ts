import React from "react";
import { Slug } from "sanity";
import { VehicleImage } from "@/VehicleTypes/interfaces";

// Al Vehicle Page
export interface VehicleItem {
  slug: {
    current: string;
  };
  model: string;
  image: string;
  price: number;
  type: string;
}
export interface NavVehicleItem {
  _id: string;
  slug: Slug;
  model: string;
  image: string;
  type: "motorcycle" | "scooter" | "moped";
}
export interface NavLinks {
  id: number;
  label: string;
  type: "link" | "dropdown";
  href?: string;
  content?: React.ReactNode;
}

export type FooterItems = {
  title: string;
  items: Array<{
    type: string;
    content?: string;
    items?: string[];
    href?: string;
    image?: string;
    alt?: string;
    width?: number;
    height?: number;
  }>;
  extra?: Array<{
    title: string;
    items: Array<{
      type: string;
      content?: string;
      href?: string;
      image?: string;
      alt?: string;
      width?: number;
      height?: number;
    }>;
  }>;
};

export interface FormWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface imageCarouselProps {
  images: VehicleImage[];
  model: string;
}

// EMAIL TEMPLATE PROPS
export interface CareerApplicationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  interestedProfile: string;
  applicationId: string;
  applicationDate?: Date;
  hasCoverLetter?: boolean;
}

export interface AMCConfirmationEmailProps {
  ownerName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  registrationNumber: string;
  amcPackage: string;
  startDate: Date;
  orderReference: string;
  additionalComments?: string;
}

export interface LoanApplicationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  employmentStatus: string;
  annualIncome: number;
  loanAmount: number;
  loanTenure: number;
  residentialAddress: string;
  additionalInfo?: string;
  applicationId: string;
  applicationDate: Date;
}

export interface ServiceBookingEmailProps {
  name: string;
  emailId: string;
  contactNumber: string;
  model: string;
  registrationNumber: string;
  serviceType: "free" | "paid";
  pickupRequired: "yes" | "no";
  bookingDate: Date;
  bookingTime: string;
  bookingId: string;
}

export interface PaymentConfirmationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  serviceDescription: string;
  amount: number;
  additionalInfo?: string;
  transactionId: string;
  paymentDate: Date;
}

export interface ServiceConfirmationEmailProps {
  name: string;
  emailId: string;
  contactNumber: string;
  model: string;
  registrationNumber: string;
  serviceType: string;
  pickupRequired: string;
  bookingDate: Date;
  bookingTime: string;
  referenceNumber: string;
}

export interface SuggestionFeedbackEmailProps {
  name?: string;
  email?: string;
  subject: string;
  message: string;
  rating?: number;
  feedbackId: string;
  submissionDate: Date;
}

export interface TestRideConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  vehicleName: string;
  variantName: string;
  dealerName: string;
  dealerAddress?: string;
  bookingDate: Date;
  bookingTime: string;
  bookingReference: string;
}

export interface VehicleExchangeConfirmationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  currentVehicleModel: string;
  currentVehicleYear: string;
  currentVehicleRegistration: string;
  desiredVehicleDetails: string;
  additionalComments?: string;
  exchangeReference: string;
  requestDate?: Date;
}

export interface InsuranceRenewalEmailProps {
  customerName: string;
  contactNumber: string;
  emailId: string;
  model: string;
  registrationNumber: string;
  registrationYear: string;
  previousInsuranceCompany: string;
  requestId: string;
  requestDate: Date;
}

export interface ContactEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  requestId: string;
  requestDate: Date;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  link: string;
}

export interface Award {
  _id: string;
  title: string;
  description?: string;
  year: number;
  organization?: string;
  image?: string;
}

interface Vehicle {
  type: string;
  model: string;
  slug: string;
  category: {
    name: string;
    parent?: {
      name: string;
    };
  };
  variants?: {
    name: string;
    slug: string;
  }[];
}

interface Subcategory {
  name: string;
  vehicles: Vehicle[];
  slug: string;
  parentCategory: {
    name: string;
  };
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface FooterSubItem {
  type: "text";
  content: string;
}

export interface FooterItem {
  type: "text" | "list" | "link";
  content?: string;
  items?: string[];
  href?: string;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  subItems?: FooterSubItem[];
}

export interface FooterItems {
  title: string;
  items: FooterItem[];
  extra?: {
    title: string;
    items: FooterItem[];
  }[];
}
