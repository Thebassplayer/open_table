import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import Header from "../components/Header";
import RestaurantNav from "../components/RestaurantNav";
import Menu from "../components/Menu";

const RestaurantMenu = () => {
  return (
    <>
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNav />
          <Menu />
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
