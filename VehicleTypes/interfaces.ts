// ! ================================
// ! Common properties for all vehicle types
// ! ================================

export interface ImageAsset {
  _ref: string;
  _type: "reference";
}

export interface VehicleImage {
  _type: "image";
  _key: string;
  asset: ImageAsset;
}

export interface Slug {
  current: string;
  _type: "slug";
}

export interface Category {
  _ref: string;
  _type: "reference";
}
// ================================
// Common properties for all vehicle types
// ================================

// ! ================================
// ! Properties for Motorcycle
// ! ================================

export interface EnginePerformance {
  compressionRatio: string;
  starting: string;
  idleSpeed: string;
  stroke: string;
  fuelInjection: string;
  capacity: string;
  gearBox: string;
  zeroToSixty: number;
  airFilter: string;
  muffler: string;
  zeroToHundred: number;
  engineType: string;
  maxSpeed: string;
  bore: string;
  powerToWeightRatio: string;
  throttleControl: string;
  coolingSystem: string;
  boreToStrokeRatio: string;
  ignition: string;
  maxTorque: string;
  maxPower: string;
  acceleration: string;
  clutch: string;
}

export interface DimensionsWeightFuel {
  length: string;
  saddleHeight: string;
  maxPayload: string;
  height: string;
  wheelBase: string;
  groundClearance: string;
  kerbWeight: string;
  fuelCapacity: string;
  width: string;
}

export interface ChassisSuspensionElectrical {
  frontSuspension: string;
  frame: string;
  tailLamp: string;
  rearSuspension: string;
  headlamp: string;
  instrumentCluster: string;
  battery: string;
}

export interface WheelsTyresBrakes {
  tyreSize: {
    rear: string;
    front: string;
  };
  abs: string;
  brakeFluid: string;
  brakeType: {
    rear: string;
    front: string;
  };
  rimSize: {
    back: string;
    front: string;
  };
}

// ================================
// Properties for Motorcycle
// ================================

// ! ================================
// ! Properties for Scooter
// ! ================================

export interface EnginePerformanceScooter {
  displacement: string;
  engineType: string;
  boreStroke: string;
  maxPower: string;
  maxTorque: string;
  numberOfValves: number;
  airFilterType: string;
  transmissionType: string;
}

export interface DimensionsWeightScooter {
  vehicleSize: string;
  wheelBase: string;
  groundClearance: string;
  groundReach: string;
  seatLength: string;
  frontLegSpace: string;
  kerbWeight: string;
}

export interface SuspensionScooter {
  suspensionFront: string;
  suspensionRear: string;
}

export interface BrakesTyresScooter {
  frontBraking: string;
  rearBraking: string;
  tyreSize: string;
}

export interface ElectricalLightingScooter {
  battery: string;
  headlamp: string;
  taillamp: string;
  startingSystem: string;
}

export interface StorageFuelScooter {
  underSeatStorage: string;
  gloveBox: string;
  fuelTankCapacity: string;
}

// ================================
// Properties for Scooter
// ================================
