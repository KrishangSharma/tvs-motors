"use client";
import { tabs } from "@/constants";
import type { VehicleDetails } from "@/types";
import { useState } from "react";

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
        <div key={key} className="py-2 capitalize">
          <span className="font-medium text-gray-800">
            {formatKeyName(key)}:{" "}
          </span>
          <span className="text-gray-600">
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
      <div key={key} className="py-2 capitalize">
        <span className="font-medium text-gray-800">
          {formatKeyName(key)}:{" "}
        </span>
        <span className="text-gray-600">
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
        <div className="p-4">
          <p className="text-gray-600">No content available for {activeTab}</p>
        </div>
      );
    }

    const chunkedData = chunkData(Object.entries(content));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {chunkedData.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="w-full bg-white rounded-lg p-5 border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {chunk.map(([key, value]) => renderField(key, value))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex space-x-4 pb-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-w-min flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderContent()}
    </>
  );
}
