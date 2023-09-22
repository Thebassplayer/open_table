import SignUpFormValues from "./schemas/signup.schema";

export {};

declare global {
  type RestaurantRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

  type User = Pick<
    SignUpFormValues,
    "email" | "first_name" | "last_name" | "phone" | "city" | "password"
  >;
}
