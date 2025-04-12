import { Rule } from "sanity";

export const TermsAndConditions = {
  name: "termsAndConditions",
  title: "Terms and Conditions",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Terms and Conditions",
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            {
              name: "sectionId",
              title: "Section ID",
              type: "string",
              description: "A unique identifier like A, B, C, etc.",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "sectionTitle",
              title: "Section Title",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Section Content",
              type: "array",
              of: [
                { type: "block" },
                {
                  type: "object",
                  name: "listBlock",
                  title: "List Block",
                  fields: [
                    {
                      name: "listType",
                      title: "List Type",
                      type: "string",
                      options: {
                        list: ["bullet", "number"],
                        layout: "radio",
                      },
                      initialValue: "bullet",
                    },
                    {
                      name: "items",
                      title: "List Items",
                      type: "array",
                      of: [{ type: "text" }],
                      validation: (Rule: Rule) => Rule.required().min(1),
                    },
                  ],
                },
              ],
            },
          ],
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
