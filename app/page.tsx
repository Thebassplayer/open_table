// Components
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const getAllRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await getAllRestaurants();
  console.log(restaurants);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-col justify-center">
        {restaurants.map(restaurant => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
