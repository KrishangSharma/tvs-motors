import { Rule } from "@sanity/types";

const Award = {
  name: "Award",
  title: "Award",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Award Title",
      type: "string",
      description: "Name of the award received",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description about the award and its significance",
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      description: "Year when the award was received",
      validation: (Rule: Rule) =>
        Rule.required().integer().min(1900).max(new Date().getFullYear()),
    },
    {
      name: "organization",
      title: "Awarding Organization",
      type: "string",
      description: "Name of the organization that presented the award",
    },
    {
      name: "image",
      title: "Award Image",
      type: "image",
      description: "Image of the award, trophy, or ceremony",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Category of the award (e.g., Service Excellence, Innovation)",
      options: {
        list: [
          { title: "Service Excellence", value: "service" },
          { title: "Innovation", value: "innovation" },
          { title: "Customer Satisfaction", value: "customer" },
          { title: "Sales Performance", value: "sales" },
          { title: "Corporate Social Responsibility", value: "csr" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Optional: Control the display order of awards within the same year (lower numbers appear first)",
    },
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      organization: "organization",
      media: "image",
    },
    prepare(value: Record<string, any>) {
      const { title, year, organization, media } = value;
      return {
        title: title || "Untitled Award",
        subtitle: organization ? `${organization} (${year})` : year.toString(),
        media: media,
      };
    },
  },
};

export default Award;
