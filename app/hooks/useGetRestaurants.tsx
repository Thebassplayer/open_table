// import { useEffect, useState } from "react";
// import { PrismaClient } from "@prisma/client";
// import { RestaurantCardType } from "@/types/prisma";

// interface UseGetRestaurants {
//   restaurants: RestaurantCardType[];
// }

// const prisma = new PrismaClient();

// const useGetRestaurants = (): UseGetRestaurants => {
//   const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);

//   useEffect(() => {
//     const getRestaurants = async (): Promise<void> => {
//       const restaurants = await prisma.restaurant.findMany({
//         select: {
//           id: true,
//           name: true,
//           main_image: true,
//           cuisine: true,
//           location: true,
//           price: true,
//           slug: true,
//         },
//       });
//       setRestaurants(restaurants);
//     };

//     getRestaurants();
//   }, []);

//   return { restaurants };
// };

// export default useGetRestaurants;
