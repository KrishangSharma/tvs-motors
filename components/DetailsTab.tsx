"use client";

import type React from "react";

import { tabs } from "@/constants";
import type { VehicleDetails } from "@/types";
import { useState } from "react";
import { Car, Gauge, Zap, Fuel, Wrench } from "lucide-react";

interface DetailsTabsProps {
  vehicle: VehicleDetails;
}

type SpecificationValue = string | number | Record<string, string | number>;
type CategoryData = Record<string, SpecificationValue>;

// Define the mapping of fields to categories
const CATEGORY_MAPPINGS = {
  // Engine & Performance category
  enginePerformance: "Engine and Performance",

  // Chassis, Suspension & Electricals category
  suspension: "Chassis, Suspension and Electricals",
  electricalLighting: "Chassis, Suspension and Electricals",
  chassisSuspensionElectrical: "Chassis, Suspension and Electricals",

  // Wheels, Tyres & Brakes category
  brakesTyres: "Wheels, Tyres and Brakes",
  wheelsTyresBrakes: "Wheels, Tyres and Brakes",

  // Dimensions, Weight & Fuel category
  dimensionsWeight: "Dimensions, Weight and Fuel",
  storageFuel: "Dimensions, Weight and Fuel",
  dimensionsWeightFuel: "Dimensions, Weight and Fuel",
} as const;

export default function DetailsTabs({ vehicle }: DetailsTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Helper function to normalize vehicle data into consistent format
  const normalizeVehicleData = (vehicle: VehicleDetails) => {
    const normalized: Record<string, CategoryData> = {
      "Engine and Performance": {},
      "Chassis, Suspension and Electricals": {},
      "Wheels, Tyres and Brakes": {},
      "Dimensions, Weight and Fuel": {},
    };

    // Helper function to safely merge objects
    const mergeObjects = (
      target: CategoryData,
      source: Record<string, unknown>
    ) => {
      if (typeof source === "object" && source !== null) {
        Object.entries(source).forEach(([key, value]) => {
          // Handle nested objects (like rimSize, brakeType, tyreSize in motorcycle schema)
          if (typeof value === "object" && value !== null) {
            target[key] = Object.entries(
              value as Record<string, string | number>
            ).reduce(
              (acc, [subKey, subValue]) => ({
                ...acc,
                [`${key}${subKey.charAt(0).toUpperCase()}${subKey.slice(1)}`]:
                  subValue,
              }),
              {}
            );
          } else {
            target[key] = value as string | number;
          }
        });
      }
      return target;
    };

    // Process each field based on category mapping
    Object.entries(vehicle).forEach(([key, value]) => {
      if (key in CATEGORY_MAPPINGS) {
        const category =
          CATEGORY_MAPPINGS[key as keyof typeof CATEGORY_MAPPINGS];
        normalized[category] = mergeObjects(normalized[category], value);
      }
    });

    return normalized;
  };

  // Map each tab to its corresponding normalized vehicle data
  const tabContent = normalizeVehicleData(vehicle);

  // Helper function to chunk the data into groups of 4
  const chunkData = (data: [string, SpecificationValue][]) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += 4) {
      chunks.push(data.slice(i, i + 4));
    }
    return chunks;
  };

  // Helper function to format key names with proper spacing
  const formatKeyName = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper function to format values
  const formatValue = (value: string | number) => {
    return String(value);
  };

  // Helper function to render a field
  const renderField = (key: string, value: SpecificationValue) => {
    if (typeof value === "object" && value !== null) {
      const subEntries = Object.entries(value);
      return (
        <div
          key={key}
          className="flex justify-between py-2 border-b border-border/30 last:border-0"
        >
          <span className="font-medium text-foreground">
            {formatKeyName(key)}
          </span>
          <span className="text-muted-foreground text-right">
            {subEntries.map(([subKey, subValue], index) => (
              <span key={subKey}>
                {formatKeyName(subKey)}:{" "}
                {formatValue(subValue as string | number)}
                {index < subEntries.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      );
    }

    return (
      <div
        key={key}
        className="flex justify-between py-2 border-b border-border/30 last:border-0"
      >
        <span className="font-medium text-foreground capitalize">
          {formatKeyName(key)}
        </span>
        <span className="text-muted-foreground text-right">
          {formatValue(value as string | number)}
        </span>
      </div>
    );
  };

  // Render the content for the active tab
  const renderContent = () => {
    const content = tabContent[activeTab];

    if (!content || Object.keys(content).length === 0) {
      return (
        <div className="p-6 text-center">
          <div className="bg-muted/30 p-8 rounded-lg">
            <p className="text-muted-foreground">
              No specifications available for {activeTab}
            </p>
          </div>
        </div>
      );
    }

    const chunkedData = chunkData(Object.entries(content));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1 py-2">
        {chunkedData.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className=" rounded-lg p-5 border border-border shadow-md transition-shadow duration-300"
          >
            {chunk.map(([key, value]) => renderField(key, value))}
          </div>
        ))}
      </div>
    );
  };

  // Determine which icon to show for each tab
  const getIconForTab = (tab: string) => {
    switch (tab) {
      case "Engine and Performance":
        return <Gauge className="h-4 w-4" />;
      case "Chassis, Suspension and Electricals":
        return <Wrench className="h-4 w-4" />;
      case "Wheels, Tyres and Brakes":
        return <Car className="h-4 w-4" />;
      case "Dimensions, Weight and Fuel":
        return <Fuel className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full">
      <div className="bg-muted p-1 rounded-lg overflow-x-auto no-scrollbar">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap
                ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
            >
              {getIconForTab(tab)}
              <span className="hidden sm:inline">{tab}</span>
            </button>
          ))}
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
