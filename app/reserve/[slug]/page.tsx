import React from "react";
import Header from "./components/Header";
import NavBar from "@/app/components/NavBar";
import Form from "./components/Form";

const Reservation = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  );
};

export default Reservation;
