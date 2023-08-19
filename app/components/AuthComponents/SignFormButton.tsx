import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";

interface SignFormButtonProps {
  isValid: boolean;
  dirty: boolean;
  isSignIn: boolean;
}

const SignFormButton = ({
  isValid,
  dirty,
  isSignIn,
}: SignFormButtonProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { isSuccess: AuthSucceded, isLoading } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    if (!isValid || !dirty || isLoading || AuthSucceded) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [AuthSucceded, isLoading, isValid, dirty]);

  return (
    <button
      type="submit"
      className={`uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 ${
        (!isValid || !dirty) && "disabled:bg-gray-400"
      }`}
      disabled={isDisabled}
    >
      <span className="flex items-center justify-center">
        {isLoading ? (
          <CircularProgress color="primary" size={20} />
        ) : isSignIn ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </span>
    </button>
  );
};

export default SignFormButton;
