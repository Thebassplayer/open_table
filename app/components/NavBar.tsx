"use client";
// Next
import Link from "next/link";
// Components
import AuthButtonAndModal, {
  AUTH_BUTTON_AND_MODAL_TYPE,
} from "./AuthComponents/AuthButtonAndModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const NavBar = (): JSX.Element => {
  const { data: userData, isLoading: isUserAuthLoading } = useContext(
    AuthenticationContext
  );
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        Cafecitos
      </Link>
      <div className="flex justify-center items-center">
        {isUserAuthLoading ? (
          <div className="w-24">
            <CircularProgress color="primary" size={20} />
          </div>
        ) : (
          <div className="flex">
            {userData ? (
              <button
                className={`border p-1 px-4 rounded bg-blue-400 text-white mr-3`}
              >
                Logout
              </button>
            ) : (
              <>
                <AuthButtonAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN} />
                <AuthButtonAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
