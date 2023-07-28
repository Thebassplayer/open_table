// import { useEffect, useState } from "react";
// import { PrismaClient } from "@prisma/client";
// import { RestaurantCardType } from "@/types/prisma";

// interface UseGetRestaurants {
//   restaurants: RestaurantCardType[];
// }

// const useGetRestaurants = (): UseGetRestaurants => {
//   const prisma = new PrismaClient();
//   const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);

//   useEffect(async () => {
//     const getRestaurants = async (): Promise<RestaurantCardType[]> => {
//       const restaurants = await prisma.restaurant.findMany({
//         select: {
//           id: true,
//           name: true,
//           main_image: true,
//           cuissine: true,
//           location: true,
//           price: true,
//           slug: true,
//         },
//       });
//       return restaurants;
//     };
//     const restaurantsArray = await getRestaurants();

//     setRestaurants(restaurantsArray);
//   }, []);

//   return {
//     restaurants,
//   };
// };

// export default useGetRestaurants;
