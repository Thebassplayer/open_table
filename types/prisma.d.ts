import { Cuissine, Location, PRICE } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuissine: Cuissine;
  location: Location;
  price: PRICE;
  slug: string;
}
