// Axios
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
// Context
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { SignInFormValues } from "@/schemas/signin.schema";
import { SignUpFormValues } from "@/schemas/signup.schema";
import { deleteCookie } from "cookies-next";

type SignInValues = Pick<SignInFormValues, "email" | "password">;

type SignUpValues = Pick<
  SignUpFormValues,
  "first_name" | "last_name" | "email" | "password" | "phone" | "city"
>;

interface AuthFunctions {
  signIn: (values: SignInValues) => Promise<void>;
  signUp: (values: SignUpValues) => Promise<void>;
  signOut: () => void;
}

const useAuth = (): AuthFunctions => {
  const { setAuthState, isLoggedIn } = useContext(AuthenticationContext);
  const signIn = async ({ email, password }: SignInValues): Promise<void> => {
    setAuthState({
      isLoading: true,
      isSignIn: false,
      isSignUp: false,
      isLoggedIn: false,
      isFetchingUserState: false,
      isError: false,
      userData: null,
      errorData: null,
    });

    try {
      const response: AxiosResponse<User> = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        isLoading: false,
        isSignIn: false,
        isSignUp: false,
        isLoggedIn: true,
        isError: false,
        userData: response.data,
        errorData: null,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setAuthState({
          userData: null,
          isSignIn: false,
          isSignUp: false,
          isLoggedIn: false,
          isLoading: false,
          isFetchingUserState: false,
          isError: true,
          errorData: error.response?.data.message,
        });
      } else {
        setAuthState({
          userData: null,
          isSignIn: false,
          isSignUp: false,
          isLoggedIn: false,
          isLoading: false,
          isError: true,
          errorData: error.message,
        });
      }
    }
  };

  const signUp = async ({
    email,
    password,
    first_name,
    last_name,
    phone,
    city,
  }: SignUpValues): Promise<void> => {
    if (isLoggedIn) return;

    setAuthState({
      isLoading: true,
      isSignUp: false,
      isSignIn: false,
      isLoggedIn: false,
      isError: false,
      userData: null,
      errorData: null,
    });

    try {
      const response: AxiosResponse<User> = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          first_name,
          last_name,
          phone,
          city,
        }
      );
      setAuthState({
        userData: response.data,
        isLoading: false,
        isSignUp: true,
        isSignIn: false,
        isLoggedIn: true,
        isError: false,
        errorData: null,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setAuthState({
          userData: null,
          isLoading: false,
          isSignUp: false,
          isSignIn: false,
          isLoggedIn: false,
          isError: true,
          errorData: error.response?.data.message,
        });
      } else {
        setAuthState({
          userData: null,
          isLoading: false,
          isSignUp: false,
          isSignIn: false,
          isLoggedIn: false,
          isError: true,
          errorData: error.message,
        });
      }
    }
  };

  const signOut = (): void => {
    deleteCookie("jwt");
    setAuthState({
      userData: null,
      isLoading: false,
      isSignIn: false,
      isSignUp: false,
      isLoggedIn: false,
      isError: false,
      errorData: null,
    });
  };

  return { signIn, signUp, signOut };
};

export default useAuth;
