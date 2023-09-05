import { useContext } from "react";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "../../constants";
import { AuthenticationContext } from "@/app/context/AuthContext";

interface AuthNavProps {
  authButtonAndModalType:
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN
    | typeof AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP;
  handleOpen: () => void;
}

const commonClasses = `border p-1 px-4 rounded`;

const AuthNav = ({
  authButtonAndModalType,
  handleOpen,
}: AuthNavProps): JSX.Element | null => {
  const { isFetchingUserState } = useContext(AuthenticationContext);

  switch (authButtonAndModalType) {
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN:
      return (
        <button
          className={`${commonClasses} bg-blue-400 text-white mr-3 ${
            isFetchingUserState ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleOpen}
        >
          Sign in
        </button>
      );
    case AUTH_BUTTON_AND_MODAL_TYPE.SIGN_UP:
      return (
        <button className={`${commonClasses}`} onClick={handleOpen}>
          Sign up
        </button>
      );
    default:
      return null;
  }
};

export default AuthNav;
