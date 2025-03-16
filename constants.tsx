import { NavLinks } from "@/types";
import ProductMenu from "@/components/ProductMenu";
import Story1 from "@/public/yt-stories/story-1.jpg";
import Story2 from "@/public/yt-stories/story-2.jpg";
import Story3 from "@/public/yt-stories/story-3.jpg";
import Story4 from "@/public/yt-stories/story-4.jpg";

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
    href: "/services",
  },
  {
    id: 3,
    label: "Shop",
    type: "dropdown",
    content: (
      <div className="grid gap-3 p-6 w-[400px]">
        <div className="text-sm">Shop content goes here</div>
      </div>
    ),
  },
  {
    id: 4,
    label: "Company",
    type: "dropdown",
    content: (
      <div className="grid gap-3 p-6 w-[400px]">
        <div className="text-sm">Company content goes here</div>
      </div>
    ),
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
