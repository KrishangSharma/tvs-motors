"use client";
import { useState } from "react";

interface DetailsTabsProps {
  vehicle: Vehicle;
}
interface Vehicle {
  model: string;
  price: number;
  images: string[];
  type: string;
  enginePerformance: Record<string, string | number>;
  chassisSuspensionElectrical: Record<string, string | number>;
  wheelsTyresBrakes: Record<string, string | number>;
  dimensionsWeightFuel: Record<string, string | number>;
}

export default function DetailsTabs({ vehicle }: DetailsTabsProps) {
  const tabs = [
    "Engine and Performance",
    "Chassis, Suspension and Electricals",
    "Wheels, Tyres and Brakes",
    "Dimensions, Weight and Fuel",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Map each tab to its corresponding vehicle data
  const tabContent: Record<string, Record<string, string | number>> = {
    "Engine and Performance": vehicle.enginePerformance,
    "Chassis, Suspension and Electricals": vehicle.chassisSuspensionElectrical,
    "Wheels, Tyres and Brakes": vehicle.wheelsTyresBrakes,
    "Dimensions, Weight and Fuel": vehicle.dimensionsWeightFuel,
  };
  // Helper function to render a field on a single line.
  const renderField = (
    key: string,
    value: string | number | Record<string, string | number>
  ) => {
    if (typeof value === "object" && value !== null) {
      // Convert object entries to a comma-separated list on one line.
      const subEntries = Object.entries(value);
      return (
        <div key={key} className="border-b pb-2 capitalize">
          <span className="font-medium text-gray-700">{key}: </span>
          <span className="text-gray-600">
            {subEntries.map(([subKey, subValue], index) => (
              <span key={subKey}>
                {subKey}: {subValue}
                {index < subEntries.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      );
    } else {
      return (
        <div key={key} className="border-b pb-2 capitalize">
          <span className="font-medium text-gray-700">{key}: </span>
          <span className="text-gray-600">{value}</span>
        </div>
      );
    }
  };

  // Render the content for the active tab.
  const renderContent = () => {
    const content = tabContent[activeTab];
    return (
      <div className="p-4">
        {content ? (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(content).map(([key, value]) =>
              renderField(key, value)
            )}
          </div>
        ) : (
          <p className="text-gray-600">No content available for {activeTab}</p>
        )}
      </div>
    );
  };

  return (
    <div className="border-t pt-4">
      {/* Scrollable tab bar with hidden scrollbar */}
      <div className="flex space-x-4 border-b pb-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-w-min flex-shrink-0 p-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
}
