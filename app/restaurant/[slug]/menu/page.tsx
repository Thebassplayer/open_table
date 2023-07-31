import RestaurantNav from "../components/RestaurantNav";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRestaurantMenu = async (slug: string): Promise<Item[] | null> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    return null;
  }
  console.log(restaurant.items);
  return restaurant.items;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await getRestaurantMenu(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNav slug={params.slug} />
        {!menu ? <div>Menu not found</div> : <Menu menu={menu} />}
      </div>
    </>
  );
};

export default RestaurantMenu;
