import { groq } from "next-sanity";

export const getVehicleQuery = groq`
  *[_type == "vehicle" && _id == $id][0] {
    _id,
    model,
    price,
    dimensions,
    mileage,
    brakes,
    fuelTankCapacity,
    maxTorque,
    maxPower,
    transmission,
    engineType,
    fuelSystem,
    suspension,
    images
  }
`;
