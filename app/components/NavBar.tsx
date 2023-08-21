"use client";
// Next
import Link from "next/link";
// Components
import AuthNavBarAndModal, {
  AUTH_BUTTON_AND_MODAL_TYPE,
} from "./AuthComponents/AuthNavBarAndModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

const NavBar = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        Cafecitos
      </Link>
      <div className="flex justify-center items-center">
        <div className="flex">
          {isLoggedIn ? (
            <button
              className={`border p-1 px-4 rounded bg-blue-400 text-white mr-3`}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <AuthNavBarAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN} />
              <AuthNavBarAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
