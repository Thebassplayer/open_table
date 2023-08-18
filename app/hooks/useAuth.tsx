// Axios
import axios from "axios";
import { AxiosResponse } from "axios";
// Schemas
import { SignInFormValues } from "@/schemas/signIn.schema";
// Context
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

interface ApiResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

interface AuthFunctions {
  signIn: (values: SignInFormValues) => Promise<void>;
  signUp: () => Promise<void>;
}

const useAuth = (): AuthFunctions => {
  const { data, loading, error, setAuthState } = useContext(
    AuthenticationContext
  );
  const signIn = async ({
    email,
    password,
  }: SignInFormValues): Promise<void> => {
    setAuthState({ loading: true, data: null, error: null });

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({ loading: false, data: response.data, error: null });
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const signUp = async (): Promise<void> => {
    // Implement your signUp logic here
  };

  return { signIn, signUp };
};

export default useAuth;
