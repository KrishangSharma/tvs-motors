import InsuranceRenewalForm from "@/components/Forms/InsuranceRenewal";
import ExpressServiceForm from "@/components/Forms/ExpressService";
import OnlineServiceBookingForm from "@/components/Forms/OnlineService";

interface Props {
  params: Promise<{ type: string }>;
}

export default async function DynamicFormPage({ params }: Props) {
  const { type } = await params;
  console.log(type);

  const renderForm = () => {
    switch (type) {
      case "insurance":
        return <InsuranceRenewalForm />;
      case "express-service":
        return <ExpressServiceForm />;
      case "online-service":
        return <OnlineServiceBookingForm />;
      default:
        return <div>Form type not found</div>;
    }
  };

  return <div className="container mx-auto px-4 py-8">{renderForm()}</div>;
}
