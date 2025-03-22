import { type SchemaTypeDefinition } from "sanity";
import Motorcycle from "../schemas/Motorcycle";
import Scooter from "../schemas/Scooter";
import Award from "../schemas/Award";
import VehicleCategory from "../schemas/VehicleCategory";
import { YTStories } from "../schemas/YTStories";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Motorcycle, Scooter, Award, VehicleCategory, YTStories],
};
