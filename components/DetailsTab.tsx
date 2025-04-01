"use client";
import { useState } from "react";
import type { Motorcycle, Scooter } from "@/VehicleTypes/VehicleTypes";

export default function DetailsTabs({
  vehicle,
}: {
  vehicle: Motorcycle | Scooter;
}) {
  const METADATA_KEYS = [
    "_id",
    "model",
    "price",
    "category",
    "slug",
    "_type",
    "_updatedAt",
    "_createdAt",
    "images",
    "type",
    "variants",
  ];

  const availableTabs = Object.keys(vehicle)
    .filter(
      (key) =>
        !METADATA_KEYS.includes(key) && // Ignore metadata keys
        typeof vehicle[key as keyof typeof vehicle] === "object"
    )
    .map(formatKeyName); // Convert camelCase to readable text

  const [activeTab, setActiveTab] = useState(availableTabs[0]);

  // Type guard to check if the vehicle has a specific property
  const hasProperty = <K extends keyof (Motorcycle | Scooter)>(
    obj: Motorcycle | Scooter,
    key: K
  ): obj is (Motorcycle | Scooter) & Record<K, unknown> => {
    return key in obj && obj[key] !== undefined;
  };

  // Helper function to format key names with proper spacing
  function formatKeyName(key: string) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  // Helper function to format values
  function formatValue(value: unknown): string {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value as Record<string, string | number>)
        .map(([k, v]) => `${formatKeyName(k)}: ${v}`)
        .join(", ");
    }
    return String(value);
  }

  // Render the content for the active tab
  function renderContent() {
    const formattedTabKey = Object.keys(vehicle).find(
      (key) => formatKeyName(key) === activeTab
    ) as keyof (Motorcycle | Scooter);

    if (!hasProperty(vehicle, formattedTabKey)) {
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

    const content = vehicle[formattedTabKey];
    if (
      !content ||
      typeof content !== "object" ||
      Object.keys(content).length === 0
    ) {
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

    const entries = Object.entries(content);
    const chunks = [];
    for (let i = 0; i < entries.length; i += 4) {
      chunks.push(entries.slice(i, i + 4));
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1 py-2">
        {chunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            className="rounded-lg p-5 border border-border shadow-md transition-shadow duration-300"
          >
            {chunk.map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2 border-b border-border/30 last:border-0"
              >
                <span className="font-medium text-foreground capitalize">
                  {formatKeyName(key)}
                </span>
                <span className="text-muted-foreground text-right">
                  {formatValue(value)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-muted p-1 rounded-lg overflow-x-auto no-scrollbar">
        <div className="flex space-x-2">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap
                ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
