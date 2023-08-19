// Axios
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
// Context
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { getCookie } from "cookies-next";
import { User } from "@prisma/client";

interface ApiResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

interface SignInValues {
  email: string;
  password: string;
}

interface SignUpValues extends SignInValues {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

interface AuthFunctions {
  signIn: (values: SignInValues) => Promise<void>;
  signUp: (values: SignUpValues) => Promise<void>;
}

const useAuth = (): AuthFunctions => {
  const { data, isLoading, error, setAuthState } = useContext(
    AuthenticationContext
  );
  const signIn = async ({ email, password }: SignInValues): Promise<void> => {
    setAuthState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: null,
      error: null,
    });

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: response.data,
        error: null,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.response?.data.message,
        });
      } else {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.message,
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
    setAuthState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      data: null,
      error: null,
    });

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
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
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: response.data,
        error: null,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.response?.data.message,
        });
      } else {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.message,
        });
      }
    }
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: false,
          error: null,
        });
      }
      const response: AxiosResponse<User> = await axios.get<User>(
        "http://localhost:3000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
        error: null,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.response?.data.message,
        });
      } else {
        setAuthState({
          data: null,
          isSuccess: false,
          isLoading: false,
          isError: true,
          error: error.message,
        });
      }
    }
  };

  return { signIn, signUp };
};

export default useAuth;
