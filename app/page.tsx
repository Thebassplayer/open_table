// Components
import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import { PrismaClient, Cuissine, Location, PRICE } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuissine: Cuissine;
  location: Location;
  price: PRICE;
  slug: string;
}

const prisma = new PrismaClient();

const getRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuissine: true,
      location: true,
      price: true,
      slug: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await getRestaurants();
  console.log(restaurants);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(restaurant => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
