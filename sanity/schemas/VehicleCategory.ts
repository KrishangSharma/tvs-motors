const VehicleCategory = {
  name: "vehicleCategory",
  title: "Vehicle Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
    {
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "vehicleCategory" }],
    },
    {
      name: "isMainCategory",
      title: "Is Main Category",
      type: "boolean",
      description:
        "Check this if this is a main category (e.g., Motorcycles, Scooters)",
    },
  ],
};

export default VehicleCategory;
