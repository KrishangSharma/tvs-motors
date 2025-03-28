import {
  VehicleImage,
  Slug,
  Category,
  EnginePerformance,
  DimensionsWeightFuel,
  ChassisSuspensionElectrical,
  WheelsTyresBrakes,
  EnginePerformanceScooter,
  DimensionsWeightScooter,
  SuspensionScooter,
  ElectricalLightingScooter,
  StorageFuelScooter,
  BrakesTyresScooter,
} from "./interfaces";

// Base VehicleDetails interface
export interface VehicleDetails {
  _id: string;
  model: string;
  images: VehicleImage[];
  price: number;
  category: Category;
  slug: Slug;
  type: string; // Could be "Motorcycle", "Scooter", "Car", etc.
  _createdAt: string;
  _updatedAt: string;
}

// Final Motorcycle Interface extending base details
export interface Motorcycle extends VehicleDetails {
  _type: "motorcycle";
  enginePerformance: EnginePerformance;
  dimensionsWeightFuel: DimensionsWeightFuel;
  chassisSuspensionElectrical: ChassisSuspensionElectrical;
  wheelsTyresBrakes: WheelsTyresBrakes;
}

// Final Scooter Interface extending base details
export interface Scooter {
  slug: Slug;
  model: string;
  price: number;
  type: string;
  category: Category;
  images: VehicleImage[];
  features: string[];
  enginePerformance: EnginePerformanceScooter;
  dimensionsWeight: DimensionsWeightScooter;
  suspension: SuspensionScooter;
  brakesTyres: BrakesTyresScooter;
  electricalLighting: ElectricalLightingScooter;
  storageFuel: StorageFuelScooter;
}
