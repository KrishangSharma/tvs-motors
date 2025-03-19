"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VehicleDetails } from "@/types";

interface ConfigureFormProps {
  vehicle: VehicleDetails;
}

export default function ConfigureForm({ vehicle }: ConfigureFormProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Assuming vehicle might have a colors array
  const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Black", value: "#000000" },
    { name: "Silver", value: "#C0C0C0" },
  ];

  return (
    <Card className="shadow-lg border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">TVS {vehicle.model}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-3xl font-bold">₹{vehicle.price}</p>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Select Color</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.name
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>

        {/* Configure Button */}
        <Button className="w-full py-6 text-base">
          Configure your {vehicle.model}
        </Button>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Time</span>
            <span className="font-medium">4-6 weeks</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Warranty</span>
            <span className="font-medium">3 Years</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
