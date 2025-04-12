import React from "react";
import {
  PrivacyPage,
  DisclaimerPage,
  TermsPage,
} from "@/components/WebsitePolicies";

const policyComponents: Record<string, React.ReactNode> = {
  "privacy-policies": <PrivacyPage />,
  disclaimer: <DisclaimerPage />,
  "terms-and-conditions": <TermsPage />,
};

interface PageProps {
  params: { docType: string };
}

const Page = async ({ params }: PageProps) => {
  const content = await policyComponents[params.docType];

  if (!content) {
    return (
      <div className="p-4 text-red-500">
        Invalid policy type: {params.docType}
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
};

export default Page;
