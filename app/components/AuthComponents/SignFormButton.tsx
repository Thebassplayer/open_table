import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { FormType } from "./AuthModalForm";
import { AUTH_BUTTON_AND_MODAL_TYPE } from "../../constants";

interface SignFormButtonProps {
  isValid: boolean;
  dirty: boolean;
  handleSubmit: () => void;
  formType: FormType;
}

const SignFormButton = ({
  isValid,
  dirty,
  handleSubmit,
  formType,
}: SignFormButtonProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { isLoggedIn, isSignIn, isSignUp, isLoading } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    if (!isValid || !dirty || isLoading || isLoggedIn || isSignIn || isSignUp) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isLoading, isValid, dirty, isLoggedIn, isSignIn, isSignUp]);

  return (
    <button
      type="submit"
      className={`uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 ${
        (!isValid || !dirty) && "disabled:bg-gray-400"
      }`}
      onKeyDown={e => {
        e.preventDefault();
        if (e.key !== "Enter") {
          handleSubmit();
        }
      }}
      onClick={e => {
        e.preventDefault();
        handleSubmit();
      }}
      disabled={isDisabled}
    >
      <span className="flex items-center justify-center">
        {isLoading ? (
          <CircularProgress color="primary" size={20} />
        ) : formType === AUTH_BUTTON_AND_MODAL_TYPE.SIGN_IN ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </span>
    </button>
  );
};

export default SignFormButton;
