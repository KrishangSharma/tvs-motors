// schemas/vehicle.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "type",
      type: "string",
      description: "Vehicle type (e.g., scooter, motorcycle, etc.)",
    }),
    defineField({
      name: "engineType",
      title: "Engine Type",
      type: "string",
      description:
        'Engine description, e.g. "312.2cc, single-cylinder, liquid-cooled, 4-stroke"',
    }),
    defineField({
      name: "maxPower",
      title: "Max Power",
      type: "string",
      description: 'Max power output, e.g. "34 PS @ 8500 rpm"',
    }),
    defineField({
      name: "maxTorque",
      title: "Max Torque",
      type: "string",
      description: 'Max torque output, e.g. "27.3 Nm @ 6500 rpm"',
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
    }),
    defineField({
      name: "fuelSystem",
      title: "Fuel System",
      type: "string",
    }),
    defineField({
      name: "suspension",
      title: "Suspension",
      type: "string",
      description: "Front and rear suspension details",
    }),
    defineField({
      name: "brakes",
      title: "Brakes",
      type: "string",
      description:
        'Brake system details (e.g., "Front disc with dual-channel ABS, rear disc")',
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description:
        "Overall dimensions (L x W x H, Wheelbase, Ground Clearance, etc.)",
    }),
    defineField({
      name: "mileage",
      title: "Mileage",
      type: "string",
      description: "Fuel efficiency details",
    }),
    defineField({
      name: "fuelTankCapacity",
      title: "Fuel Tank Capacity",
      type: "string",
      description: 'Capacity of the fuel tank (e.g., "12 litres")',
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Ex-showroom or on-road price",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description:
        "List of key features (e.g., Digital instrument cluster, LED headlamps, etc.)",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Vehicle images",
    }),
  ],
});
