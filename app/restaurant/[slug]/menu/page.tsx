import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import Header from "../components/Header";
import RestaurantNav from "../components/RestaurantNav";
import Menu from "../components/Menu";

const RestaurantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNav />
        <Menu />
      </div>
    </>
  );
};

export default RestaurantMenu;
