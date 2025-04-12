import TestRideForm from "./Forms/TestRideForm";
import fetchVehiclesForForm from "@/lib/fetchVehiclesForForm";

const TestRideContainer = async () => {
  const vehicles = await fetchVehiclesForForm();
  return <TestRideForm vehicleData={vehicles} />;
};

export default TestRideContainer;
