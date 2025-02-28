"use client";
import { useState } from "react";
// import { Vehicle } from "@/types";

// import { Vehicle } from "@/types";

// interface DetailsTabsProps {
//   vehicle: Vehicle;
// }

// export default function DetailsTabs({ vehicle }: DetailsTabsProps) {
export default function DetailsTabs() {
  const tabs = ["Specifications", "Fuel and Mileage", "Brakes and more"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Placeholder content for each tab
  const renderContent = () => {
    return (
      <div className="p-4">
        <p className="text-gray-600">Content for {activeTab} coming soon..</p>
      </div>
    );
  };

  return (
    <div className="border-t pt-4">
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm ${
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
