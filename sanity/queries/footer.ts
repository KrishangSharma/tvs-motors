import { groq } from "next-sanity";

export const footerQuery = groq`
  *[_type == "vehicleCategory" && isMainCategory == true] | order(order asc) {
    name,
    "subcategories": *[_type == "vehicleCategory" && references(^._id)] | order(order asc) {
      "slug": slug.current,
      name,
        "parentCategory": parentCategory->{name},

      "vehicles": *[_type in ["motorcycle", "scooter"] && references(^._id)] | order(model asc) {
        type,
        model,
        "slug": slug.current,
        "category": category->{
          name,
          "parent": parentCategory->{
            name
          }
        }
      }
    }
  }
`;
