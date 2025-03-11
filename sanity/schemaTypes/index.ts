import { type SchemaTypeDefinition } from "sanity";
import Motorcycle from "../schemas/Motorcycle";
import Scooter from "../schemas/Scooter";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Motorcycle, Scooter],
};
