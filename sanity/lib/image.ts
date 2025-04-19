import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Function to create URL for file assets like PDFs
export const fileUrl = (fileAsset: {
  _ref?: string;
  asset?: { _ref: string };
}) => {
  if (!fileAsset) return null;

  // Get the reference string, handling both direct _ref and nested asset._ref
  const ref = fileAsset._ref || (fileAsset.asset && fileAsset.asset._ref);

  if (!ref) return null;

  // Parse the file reference (format: file-[fileId]-[extension])
  const [, fileId, extension] = ref.split(/file-|-/);

  if (!fileId || !extension) return null;

  // Construct the URL to the file
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
};
