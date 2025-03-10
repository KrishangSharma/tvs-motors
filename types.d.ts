import React from "react";
import { Slug } from "sanity";

export interface Vehicle {
  _id: string;
  model: string;
  price: number;
  type: string;
  images: string[];
  engineType: string;
  maxPower: string;
  maxTorque: string;
  fuelSystem: string;
  transmission: string;
  suspension: string;
  brakes: string;
  dimensions: string;
  fuelTankCapacity: string;
  mileage: string;
}
export interface NavVehicleItem {
  _id: string;
  slug: Slug;
  model: string;
  image: string;
  type: "motorcycle" | "scooter" | "moped";
}

export interface BentoVehicleItem {
  slug: {
    current: string;
  };
  model: string;
  image: string;
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
