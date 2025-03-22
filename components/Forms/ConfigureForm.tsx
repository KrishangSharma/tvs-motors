import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VehicleDetails } from "@/types";

interface ConfigureFormProps {
  vehicle: VehicleDetails;
}

const formatIndianPrice = (price: number) => {
  // Convert to 2 decimal places
  const priceWithDecimals = price.toFixed(2);

  // Split the number into whole and decimal parts
  const [wholePart, decimalPart] = priceWithDecimals.split(".");

  // Convert to string and split into array of characters
  const digits = wholePart.split("");

  // Start from the right, leave last 3 digits, then group by 2
  const formattedWholePart = digits.reverse().reduce((acc, digit, i) => {
    if (i === 0) return digit;
    if (i === 1) return digit + acc;
    if (i === 2) return digit + acc;
    if ((i - 3) % 2 === 0) return digit + "," + acc;
    return digit + acc;
  }, "");

  return `₹${formattedWholePart}.${decimalPart}`;
};

export default function ConfigureForm({ vehicle }: ConfigureFormProps) {
  return (
    <Card className="shadow-lg border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">TVS {vehicle.model}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-3xl font-bold">
            {formatIndianPrice(vehicle.price)}
          </p>
        </div>

        {/* Configure Button */}
        <Button className="w-full py-6 text-base">
          Configure your {vehicle.model}
        </Button>

        {/* Additional Info */}
        {/* <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Time</span>
            <span className="font-medium">4-6 weeks</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Warranty</span>
            <span className="font-medium">3 Years</span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
