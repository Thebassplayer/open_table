"use client";
// Next
import Link from "next/link";
// Components
import AuthButtonAndModal, {
  AUTH_BUTTON_AND_MODAL_TYPE,
} from "./AuthComponents/AuthButtonAndModal";

const NavBar = (): JSX.Element => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <AuthButtonAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN} />
          <AuthButtonAndModal type={AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
