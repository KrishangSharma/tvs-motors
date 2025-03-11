const Motorcycle = {
  name: "motorcycle",
  title: "Motorcycle",
  type: "document",
  fields: [
    // Basic Fields
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "model",
        maxLength: 96,
      },
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
    // Category 1: Engine & Performance
    {
      name: "enginePerformance",
      title: "Engine & Performance",
      type: "object",
      fields: [
        { name: "engineType", title: "Engine Type", type: "string" },
        { name: "capacity", title: "Capacity", type: "string" },
        { name: "maxPower", title: "Max Power", type: "string" },
        { name: "maxTorque", title: "Max Torque", type: "string" },
        { name: "bore", title: "Bore", type: "string" },
        { name: "stroke", title: "Stroke", type: "string" },
        { name: "fuelInjection", title: "Fuel Injection", type: "string" },
        { name: "throttleControl", title: "Throttle Control", type: "string" },
        {
          name: "boreToStrokeRatio",
          title: "Bore to Stroke Ratio",
          type: "string",
        },
        { name: "starting", title: "Starting", type: "string" },
        { name: "idleSpeed", title: "Idle Speed", type: "string" },
        { name: "ignition", title: "Ignition", type: "string" },
        {
          name: "powerToWeightRatio",
          title: "Power-to-Weight Ratio",
          type: "string",
        },
        {
          name: "compressionRatio",
          title: "Compression Ratio",
          type: "string",
        },
        { name: "airFilter", title: "Air Filter", type: "string" },
        { name: "coolingSystem", title: "Cooling System", type: "string" },
        { name: "muffler", title: "Muffler", type: "string" },
        { name: "clutch", title: "Clutch", type: "string" },
        { name: "gearBox", title: "Gear Box", type: "string" },
        { name: "maxSpeed", title: "Max Speed", type: "string" },
        {
          name: "acceleration",
          title: "Acceleration 0-2 seconds(km/h)",
          type: "string",
        },
        { name: "zeroToSixty", title: "0-60 (seconds)", type: "number" },
        { name: "zeroToHundred", title: "0-100 (seconds)", type: "number" },
      ],
    },
    // Category 2: Chassis, Suspension & Electrical
    {
      name: "chassisSuspensionElectrical",
      title: "Chassis, Suspension & Electrical",
      type: "object",
      fields: [
        { name: "frame", title: "Frame", type: "string" },
        { name: "frontSuspension", title: "Front Suspension", type: "string" },
        { name: "rearSuspension", title: "Rear Suspension", type: "string" },
        { name: "battery", title: "Battery", type: "string" },
        { name: "headlamp", title: "Headlamp", type: "string" },
        { name: "tailLamp", title: "Tail Lamp", type: "string" },
        {
          name: "instrumentCluster",
          title: "Instrument Cluster",
          type: "string",
        },
      ],
    },
    // Category 3: Wheels, Tyre & Brakes
    {
      name: "wheelsTyresBrakes",
      title: "Wheels, Tyre & Brakes",
      type: "object",
      fields: [
        {
          name: "rimSize",
          title: "Rim Size (Front & Back)",
          type: "object",
          fields: [
            { name: "front", title: "Front Rim Size", type: "string" },
            { name: "back", title: "Back Rim Size", type: "string" },
          ],
        },
        {
          name: "brakeType",
          title: "Brake Type (Front & Back)",
          type: "object",
          fields: [
            { name: "front", title: "Front Brake Type", type: "string" },
            { name: "rear", title: "Rear Brake Type", type: "string" },
          ],
        },
        {
          name: "tyreSize",
          title: "Tyre Size (Front & Back)",
          type: "object",
          fields: [
            { name: "front", title: "Front Tyre Size", type: "string" },
            { name: "rear", title: "Rear Tyre Size", type: "string" },
          ],
        },
        { name: "abs", title: "ABS", type: "string" },
        { name: "brakeFluid", title: "Brake Fluid", type: "string" },
      ],
    },
    // Category 4: Dimensions, Weight & Fuel Capacity
    {
      name: "dimensionsWeightFuel",
      title: "Dimensions, Weight & Fuel Capacity",
      type: "object",
      fields: [
        { name: "height", title: "Height", type: "string" },
        { name: "width", title: "Width", type: "string" },
        { name: "length", title: "Length", type: "string" },
        { name: "wheelBase", title: "Wheel Base", type: "string" },
        { name: "groundClearance", title: "Ground Clearance", type: "string" },
        { name: "saddleHeight", title: "Saddle Height", type: "string" },
        { name: "kerbWeight", title: "Kerb Weight", type: "string" },
        { name: "maxPayload", title: "Max Payload", type: "string" },
        { name: "fuelCapacity", title: "Fuel Capacity", type: "string" },
      ],
    },
  ],
};

export default Motorcycle;
