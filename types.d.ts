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
