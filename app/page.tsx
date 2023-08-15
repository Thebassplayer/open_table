// Components
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
// Prisma
import { prisma } from "@/app/lib/prisma";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import { ToastContainer } from "react-toastify";

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
  return (
    <>
      <ToastContainer />
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              restaurant={restaurant}
              key={`${restaurant}-${index}`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
