"use client";
import { tabs } from "@/constants";
import type { VehicleDetails } from "@/types";
import { useState } from "react";

interface DetailsTabsProps {
  vehicle: VehicleDetails;
}

export default function DetailsTabs({ vehicle }: DetailsTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Map each tab to its corresponding vehicle data
  const tabContent: Record<string, Record<string, string | number>> = {
    "Engine and Performance": vehicle.enginePerformance,
    "Chassis, Suspension and Electricals": vehicle.chassisSuspensionElectrical,
    "Wheels, Tyres and Brakes": vehicle.wheelsTyresBrakes,
    "Dimensions, Weight and Fuel": vehicle.dimensionsWeightFuel,
  };

  // Helper function to chunk the data into groups of 4
  const chunkData = (
    data: [string, string | number | Record<string, string | number>][]
  ) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += 4) {
      chunks.push(data.slice(i, i + 4));
    }
    return chunks;
  };

  // Helper function to render a field
  const renderField = (
    key: string,
    value: string | number | Record<string, string | number>
  ) => {
    if (typeof value === "object" && value !== null) {
      // Convert object entries to a comma-separated list on one line.
      const subEntries = Object.entries(value);
      return (
        <div key={key} className="py-2 capitalize">
          <span className="font-medium text-gray-800">{key}: </span>
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
        <div key={key} className="py-2 capitalize">
          <span className="font-medium text-gray-800">{key}: </span>
          <span className="text-gray-600">{value}</span>
        </div>
      );
    }
  };

  // Render the content for the active tab.
  const renderContent = () => {
    const content = tabContent[activeTab];

    if (!content) {
      return (
        <div className="p-4">
          <p className="text-gray-600">No content available for {activeTab}</p>
        </div>
      );
    }

    // Chunk the data into groups of 4 items
    const chunkedData = chunkData(Object.entries(content));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {chunkedData.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="w-full bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            {chunk.map(([key, value]) => renderField(key, value))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Scrollable tab bar with hidden scrollbar */}
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
