// Components
import RestaurantNav from "@/app/restaurant/[slug]/components/RestaurantNav";
import Title from "@/app/restaurant/[slug]/components/Title";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import Rating from "./components/Rating";
import Reservation from "./components/Reservation";
// Prisma
import { prisma } from "@/app/lib/prisma";
import { Review } from "@prisma/client";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const getRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });
  if (!restaurant) throw new Error("Restaurant not found");

  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const restaurant = await getRestaurantBySlug(slug);
  const { name, images, description, reviews } = restaurant;
  console.log(reviews);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNav slug={slug} />
        <Title name={name} />
        <Rating />
        <Description description={description} />
        <Images images={images} />
        {}
        <Reviews reviews={reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <Reservation />
      </div>
    </>
  );
};

export default RestaurantDetails;
