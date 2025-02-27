import { type SchemaTypeDefinition } from "sanity";
import vehicle from "../schemas/vehicles";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicle],
};
