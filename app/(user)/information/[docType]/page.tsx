import React from "react";
import {
  PrivacyPage,
  DisclaimerPage,
  TermsPage,
} from "@/components/WebsitePolicies";

// const policyComponents: Record<string, React.ReactNode> = {
//   "privacy-policies": <PrivacyPage />,
//   disclaimer: <DisclaimerPage />,
//   "terms-and-conditions": <TermsPage />,
// };
const policyComponents = async (docType: string) => {
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

interface Props {
  params: { docType: string };
}

const Page = async ({ params }: Props) => {
  const content = policyComponents(params.docType);

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
