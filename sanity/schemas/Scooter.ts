const Scooter = {
  name: "scooter",
  title: "Scooter",
  type: "document",
  fields: [
    // Basic Fields
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "model",
        maxLength: 96,
      },
    },
    {
      name: "model",
      title: "Model",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "Vehicle price in INR",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "vehicleCategory" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    // Variants Field
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "variantName",
              title: "Variant Name",
              type: "string",
            },
            {
              name: "colors",
              title: "Colors",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      title: "Color Name",
                      type: "string",
                    },
                    {
                      name: "hexCode",
                      title: "Hex Code",
                      type: "string",
                    },
                    {
                      name: "image",
                      title: "Color Image",
                      type: "image",
                    },
                  ],
                },
              ],
            },
            {
              name: "variantFeatures",
              title: "Variant Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },

    // Category 1: Engine & Performance
    {
      name: "enginePerformance",
      title: "Engine & Performance",
      type: "object",
      fields: [
        { name: "displacement", title: "Displacement", type: "string" }, // e.g. "124.8 cc"
        { name: "engineType", title: "Engine Type", type: "string" }, // e.g. "Single cylinder, 4 stroke, Air cooled"
        { name: "boreStroke", title: "Bore x Stroke", type: "string" }, // e.g. "53.5 x 55.5 mm"
        { name: "maxPower", title: "Max Power", type: "string" }, // e.g. "6.0 KW @ 6500 rpm"
        { name: "maxTorque", title: "Max Torque", type: "string" }, // e.g. "10.5 @ 4500 rpm"
        { name: "numberOfValves", title: "No. of Valves", type: "number" }, // e.g. 2
        { name: "airFilterType", title: "Air Filter Type", type: "string" }, // e.g. "Paper Filter"
        {
          name: "transmissionType",
          title: "Transmission Type",
          type: "string",
        }, // e.g. "CVT Automatic"
      ],
    },
    // Category 2: Dimensions & Weight
    {
      name: "dimensionsWeight",
      title: "Dimensions & Weight",
      type: "object",
      fields: [
        { name: "vehicleSize", title: "Vehicle Size", type: "string" }, // e.g. "1852 x 691 x 1168 mm"
        { name: "wheelBase", title: "Wheel Base", type: "string" }, // e.g. "1275 mm"
        { name: "groundClearance", title: "Ground Clearance", type: "string" }, // e.g. "163 mm"
        { name: "groundReach", title: "Ground Reach", type: "string" }, // e.g. "765 mm"
        { name: "seatLength", title: "Seat Length", type: "string" }, // e.g. "790 mm"
        { name: "frontLegSpace", title: "Front Leg Space", type: "string" }, // e.g. "380 mm"
        { name: "kerbWeight", title: "Kerb Weight", type: "string" }, // e.g. "108 kgs"
      ],
    },
    // Category 3: Suspension
    {
      name: "suspension",
      title: "Suspension",
      type: "object",
      fields: [
        { name: "suspensionFront", title: "Front Suspension", type: "string" }, // e.g. "Telescopic Hydraulic"
        { name: "suspensionRear", title: "Rear Suspension", type: "string" }, // e.g. "Twin tube emulsion type shock absorber with 3 step adjustment"
      ],
    },
    // Category 4: Brakes & Tyres
    {
      name: "brakesTyres",
      title: "Brakes & Tyres",
      type: "object",
      fields: [
        { name: "frontBraking", title: "Front Braking", type: "string" }, // e.g. "220 mm disc"
        { name: "rearBraking", title: "Rear Braking", type: "string" }, // e.g. "130 mm drum"
        { name: "tyreSize", title: "Tyre Size (Tubeless)", type: "string" }, // e.g. "90/90 -12 - 54 J (Front & Rear)"
      ],
    },
    // Category 5: Electrical & Lighting
    {
      name: "electricalLighting",
      title: "Electrical & Lighting",
      type: "object",
      fields: [
        { name: "battery", title: "Battery", type: "string" }, // e.g. "MF 12 V , 4 AH"
        { name: "headlamp", title: "Headlamp", type: "string" }, // e.g. "LED - Clear lens with MFR"
        { name: "taillamp", title: "Taillamp", type: "string" }, // e.g. "Bulb with LED light guide"
        { name: "startingSystem", title: "Starting System", type: "string" }, // e.g. "Electric Silent Start"
      ],
    },
    // Category 6: Storage & Fuel
    {
      name: "storageFuel",
      title: "Storage & Fuel",
      type: "object",
      fields: [
        {
          name: "underSeatStorage",
          title: "Under Seat Storage",
          type: "string",
        }, // e.g. "33 Ltrs"
        {
          name: "gloveBox",
          title: "Glove Box (Front - open type)",
          type: "string",
        }, // e.g. "2 Ltrs"
        {
          name: "fuelTankCapacity",
          title: "Fuel Tank Capacity",
          type: "string",
        }, // e.g. "5.1 Ltrs"
      ],
    },
  ],
};
export default Scooter;
