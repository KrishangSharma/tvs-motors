import { NavLinks } from "@/types";
import ProductMenu from "@/components/ProductMenu";
import Story1 from "@/public/yt-stories/story-1.jpg";
import Story2 from "@/public/yt-stories/story-2.jpg";
import Story3 from "@/public/yt-stories/story-3.jpg";
import Story4 from "@/public/yt-stories/story-4.jpg";
import {
  Bike,
  PackageSearch,
  Wrench,
  Briefcase,
  Phone,
  Calculator,
  RefreshCw,
  Clock,
  Shield,
  Repeat,
  CreditCard,
  Calendar,
  MessageSquare,
  Award,
  Building2,
  Factory,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { IconHome } from "@tabler/icons-react";

// NAVBAR CONSTANTS
export const navLinks: NavLinks[] = [
  {
    id: 1,
    label: "Products",
    type: "dropdown",
    content: <ProductMenu />,
  },
  {
    id: 2,
    label: "Services",
    type: "link",
    href: "/our-services",
  },
  {
    id: 3,
    label: "Awards",
    type: "link",
    href: "/awards",
  },

  {
    id: 4,
    label: "Company",
    type: "link",
    href: "/company",
  },
];

// PRODUCT MENU CONSTANTS
export const vehicleTypes = [
  { id: "motorcycle", label: "Motorcycles" },
  { id: "scooter", label: "Scooters" },
  { id: "moped", label: "Mopeds" },
];

// VEHICLE CARD ANIMATION VARIANTS
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const buttonVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const dockLinks = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },

  {
    title: "Products",
    icon: (
      <PackageSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/product/vehicles",
  },
  {
    title: "Services",
    icon: (
      <Wrench className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/our-services",
  },
  {
    title: "Test Ride",
    icon: (
      <Bike className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/test-ride",
  },
];

// DETAILS TAB CONSTANTS
export const tabs = [
  "Engine and Performance",
  "Chassis, Suspension and Electricals",
  "Wheels, Tyres and Brakes",
  "Dimensions, Weight and Fuel",
];

// Stories (YouTube Video Links)
export const stories = [
  {
    id: 1,
    thumbnail: Story1,
    title: "Celebrating Mr. Venu Srinivasan's Llifetime Achievement Award",
    source: "https://youtu.be/A90E-fu1e3o",
  },
  {
    id: 2,
    thumbnail: Story2,
    title: "",
    source: "https://youtu.be/n7Y89U8AjSs",
  },
  {
    id: 3,
    thumbnail: Story3,
    title: "",
    source: "https://youtu.be/ylNZddpP4YE",
  },
  {
    id: 4,
    thumbnail: Story4,
    title: "",
    source: "https://youtu.be/DHNsur93omY",
  },
];

export const timeSlots = [
  { id: "morning1", time: "09:00 AM - 10:00 AM", period: "Morning" },
  { id: "morning2", time: "10:00 AM - 11:00 AM", period: "Morning" },
  { id: "morning3", time: "11:00 AM - 12:00 PM", period: "Morning" },
  { id: "afternoon1", time: "12:00 PM - 01:00 PM", period: "Afternoon" },
  { id: "afternoon2", time: "02:00 PM - 03:00 PM", period: "Afternoon" },
  { id: "afternoon3", time: "03:00 PM - 04:00 PM", period: "Afternoon" },
  { id: "evening1", time: "04:00 PM - 05:00 PM", period: "Evening" },
  { id: "evening2", time: "05:00 PM - 06:00 PM", period: "Evening" },
  { id: "evening3", time: "06:00 PM - 07:00 PM", period: "Evening" },
];

export const vehicles = [
  { id: "1", name: "TVS Apache RR 310" },
  { id: "2", name: "TVS Apache RTR 200 4V" },
  { id: "3", name: "TVS Ronin" },
  { id: "4", name: "TVS Jupiter" },
  { id: "5", name: "TVS NTORQ" },
];

export const vehicleVariants = {
  "1": [
    { id: "1-1", name: "Standard" },
    { id: "1-2", name: "BTO" },
  ],
  "2": [
    { id: "2-1", name: "Single Channel ABS" },
    { id: "2-2", name: "Dual Channel ABS" },
  ],
  "3": [
    { id: "3-1", name: "Single Tone" },
    { id: "3-2", name: "Dual Tone" },
    { id: "3-3", name: "Triple Tone" },
  ],
  "4": [
    { id: "4-1", name: "Standard" },
    { id: "4-2", name: "ZX" },
    { id: "4-3", name: "ZX Disc" },
    { id: "4-4", name: "Classic" },
  ],
  "5": [
    { id: "5-1", name: "Race XP" },
    { id: "5-2", name: "Super Squad Edition" },
    { id: "5-3", name: "Standard" },
  ],
} as const;

export const sampleDealers = [
  { id: "d1", name: "TVS Motors Authorized Dealer - City Center" },
  { id: "d2", name: "TVS Motors Authorized Dealer - Highway Road" },
  { id: "d3", name: "TVS Motors Authorized Dealer - Main Street" },
];

// Sample vehicle and variant data for mapping IDs to names
export const vehicleMap = {
  "1": "TVS Apache RR 310",
  "2": "TVS Apache RTR 200 4V",
  "3": "TVS Ronin",
  "4": "TVS Jupiter",
  "5": "TVS NTORQ",
};

export const variantMap = {
  "1-1": "Standard",
  "1-2": "BTO",
  "2-1": "Single Channel ABS",
  "2-2": "Dual Channel ABS",
  "3-1": "Single Tone",
  "3-2": "Dual Tone",
  "3-3": "Triple Tone",
  "4-1": "Standard",
  "4-2": "ZX",
  "4-3": "ZX Disc",
  "4-4": "Classic",
  "5-1": "Race XP",
  "5-2": "Super Squad Edition",
  "5-3": "Standard",
};

// Sample dealer data for mapping IDs to names and addresses
export const dealerMap = {
  d1: {
    name: "TVS Motors Authorized Dealer - City Center",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
  },
  d2: {
    name: "TVS Motors Authorized Dealer - Highway Road",
    address: "456 Highway Road, Mumbai, Maharashtra 400002",
  },
  d3: {
    name: "TVS Motors Authorized Dealer - Main Street",
    address: "789 Main Street, Mumbai, Maharashtra 400003",
  },
};

export const services = [
  {
    id: 1,
    title: "Career Application",
    description:
      "Join our team of automotive professionals and build your career with us",
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    link: "/careers/apply",
  },
  {
    id: 2,
    title: "Contact Us",
    description:
      "Get in touch with our customer support team for any queries or assistance",
    icon: <Phone className="h-10 w-10 text-primary" />,
    link: "/contact-us",
  },
  {
    id: 3,
    title: "Test Ride",
    description:
      "Book a test ride with our team to experience the thrill of our vehicles",
    icon: <Bike className="h-10 w-10 text-primary" />,
    link: "/test-ride",
  },
  {
    id: 4,
    title: "EMI Calculator",
    description:
      "Calculate your monthly installments for vehicle purchases and services",
    icon: <Calculator className="h-10 w-10 text-primary" />,
    link: "/emi-calculator",
  },
  {
    id: 5,
    title: "Vehicle Exchange",
    description:
      "Trade in your old vehicle for a new one with our hassle-free exchange program",
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    link: "/exchange",
  },
  {
    id: 6,
    title: "Express Service",
    description:
      "Quick maintenance services for your vehicle when you're short on time",
    icon: <Clock className="h-10 w-10 text-primary" />,
    link: "/express-service",
  },
  {
    id: 7,
    title: "AMC",
    description:
      "Comprehensive maintenance packages to keep your vehicle in top condition",
    icon: <Shield className="h-10 w-10 text-primary" />,
    link: "/get-amc",
  },
  {
    id: 8,
    title: "Insurance Renewal",
    description:
      "Renew your vehicle insurance quickly and easily with our assistance",
    icon: <Repeat className="h-10 w-10 text-primary" />,
    link: "/insurance-renewal",
  },
  {
    id: 9,
    title: "Loan Application",
    description:
      "Apply for vehicle loans with competitive interest rates and flexible terms",
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    link: "/loan-application",
  },
  {
    id: 10,
    title: "Online Service Booking",
    description:
      "Book your vehicle service appointment online at your convenience",
    icon: <Calendar className="h-10 w-10 text-primary" />,
    link: "/online-service",
  },
  {
    id: 11,
    title: "Suggestions",
    description:
      "Share your feedback and suggestions to help us improve our services",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    link: "/suggestions",
  },
];

// Company features data
export const companyFeatures = [
  {
    icon: <Factory className="h-5 w-5 text-primary" />,
    title: "Manufacturing Excellence",
    description: "State-of-the-art facilities across India",
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "Global Presence",
    description: "Exports to over 60 countries worldwide",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Strong Workforce",
    description: "Over 7,000 dedicated employees",
  },
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "Quality Commitment",
    description: "Multiple quality certifications",
  },
];

// Milestones data
export const milestones = [
  {
    year: "1978",
    description:
      "Establishment of TVS Motor Company as Sundaram-Clayton Ltd's subsidiary for two-wheelers",
  },
  {
    year: "1984",
    description:
      "Launch of India's first indigenous two-seater moped, the TVS 50",
  },
  {
    year: "2001",
    description:
      "Became an independent company after restructuring from Sundaram-Clayton Ltd",
  },
  {
    year: "2020",
    description:
      "Acquisition of Norton Motorcycles, expanding global premium motorcycle portfolio",
  },
];

// Vision points data
export const visionPoints = [
  "Global leadership in two-wheeler manufacturing",
  "Pioneering sustainable mobility solutions",
  "Setting new benchmarks in customer satisfaction",
];

// Mission points data
export const missionPoints = [
  "Continuous innovation in product development",
  "Operational excellence across all functions",
  "Environmental stewardship in all business activities",
];

// Values points data
export const valuesPoints = [
  "Integrity and transparency in all dealings",
  "Customer-centricity as our primary focus",
  "Excellence and continuous improvement",
  "Respect for individuals and the environment",
];

// Global presence data
export const globalPresence = [
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Headquarters",
    description: "Chennai, India",
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Manufacturing Units",
    description: "India, Indonesia, Uganda",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Key Markets",
    description: "Asia, Africa, Latin America",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Established",
    description: "1978",
  },
];

// Leadership team data
export const leadershipTeam = [
  {
    name: "Venu Srinivasan",
    position: "Chairman Emeritus",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sudarshan Venu",
    position: "Managing Director",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "K.N. Radhakrishnan",
    position: "Director & CEO",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sir Ralf Speth",
    position: "Chairman",
    image: "/placeholder.svg?height=300&width=300",
  },
];
