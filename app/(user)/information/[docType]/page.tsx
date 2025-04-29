import React from "react";
import {
  PrivacyPage,
  DisclaimerPage,
  TermsPage,
} from "@/components/WebsitePolicies";

const policyComponents = (docType: string) => {
  switch (docType) {
    case "privacy-policies":
      return <PrivacyPage />;
    case "disclaimer":
      return <DisclaimerPage />;
    case "terms-and-conditions":
      return <TermsPage />;
    default:
      return null;
  }
};

// Define the params type as expected by Next.js
interface PageProps {
  params: Promise<{ docType: string }>;
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { docType } = resolvedParams;

  // Get the appropriate policy component
  const content = policyComponents(docType);

  if (!content) {
    return (
      <div className="p-4 text-red-500">Invalid policy type: {docType}</div>
    );
  }

  return <div className="p-4">{content}</div>;
};

export default Page;
