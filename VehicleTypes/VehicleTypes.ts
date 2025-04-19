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
  ImageAsset,
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
  variants?: Variant[];
  brochure: {
    _ref: string;
    asset: { _ref: string };
  };
}

export interface Color {
  name: string;
  hexCode: string;
  image: ImageAsset;
}

export interface Variant {
  variantName: string;
  colors: Color[];
  variantFeatures: string[];
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
