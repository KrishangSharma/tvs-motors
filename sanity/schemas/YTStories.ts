import { Rule } from "@sanity/types";

export const YTStories = {
  name: "ytStories",
  title: "YouTube Stories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "source",
      title: "YouTube URL",
      type: "url",
      validation: (Rule: Rule) =>
        Rule.required().custom((url: string) => {
          if (!url) return true;
          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
          if (!youtubeRegex.test(url)) {
            return "Please enter a valid YouTube URL";
          }
          return true;
        }),
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Upload a thumbnail image for the video card",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
  },
};
