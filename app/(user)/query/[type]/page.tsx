import InsuranceRenewalForm from "@/components/Forms/InsuranceRenewal";
import ExpressServiceForm from "@/components/Forms/ExpressService";
import OnlineServiceBookingForm from "@/components/Forms/OnlineService";
import BuyAMCForm from "@/components/Forms/BuyAMC";
import BookVehicleForm from "@/components/Forms/BookVehicle";
import CareerForm from "@/components/Forms/CareerForm";
import EMICalculatorForm from "@/components/Forms/EMIForm";
import ExchangeForm from "@/components/Forms/ExchangeForm";
import GenericPaymentForm from "@/components/Forms/GenericPayment";
import LoanApplicationForm from "@/components/Forms/LoanApplication";
import SuggestionForm from "@/components/Forms/SuggestionForm";

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
      case "buy-amc":
        return <BuyAMCForm />;
      case "book-vehicle":
        return <BookVehicleForm />;
      case "career":
        return <CareerForm />;
      case "emi":
        return <EMICalculatorForm />;
      case "exchange":
        return <ExchangeForm />;
      case "payment":
        return <GenericPaymentForm />;
      case "loan":
        return <LoanApplicationForm />;
      case "suggestion":
        return <SuggestionForm />;
      default:
        return <div>Form type not found</div>;
    }
  };

  return <div className="container mx-auto px-4 py-8">{renderForm()}</div>;
}
