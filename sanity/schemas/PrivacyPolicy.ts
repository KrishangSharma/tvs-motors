import { Rule } from "sanity";

export const PrivacyPolicy = {
  name: "PrivacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Privacy Policy",
      readOnly: true,
    },
    {
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "informationCollected",
      title: "Information We May Collect",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "infoList",
          title: "Information List",
          fields: [
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
    },
    {
      name: "usage",
      title: "Usage of Information",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "usageList",
          title: "Usage Points",
          fields: [
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
    },
    {
      name: "externalLinks",
      title: "Links to Other Websites",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "controlInfo",
      title: "Controlling Your Personal Information",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "controlList",
          title: "Control Options",
          fields: [
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
    },
    {
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "companyName",
          title: "Company Name",
          type: "string",
          initialValue: "Sabharwal Automobiles",
        },
        {
          name: "address",
          title: "Address",
          type: "text",
          initialValue:
            "Sabharwal TVS\nNo. 4, Main Rohtak Road,\nInder Enclave, Peeragarhi,\nNew Delhi 110 087",
        },
        {
          name: "email",
          title: "E‐Mail ID",
          type: "string",
          initialValue: "customercare@sabharwaltvs.com",
        },
      ],
    },
    {
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        calendarTodayLabel: "Today",
      },
    },
  ],
};
