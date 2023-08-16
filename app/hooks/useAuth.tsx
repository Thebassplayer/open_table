import { AxiosResponse } from "axios";
import { SignInFormValues } from "@/schemas/signIn.schema";
import axios from "axios";

interface ApiResponse {
  // Define the structure of the API response if needed
  // For example:
  message: string;
}

interface AuthFunctions {
  signIn: (values: SignInFormValues) => Promise<void>;
  signUp: () => Promise<void>;
}

const useAuth = (): AuthFunctions => {
  const signIn = async ({
    email,
    password,
  }: SignInFormValues): Promise<void> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const signUp = async (): Promise<void> => {
    // Implement your signUp logic here
  };

  return { signIn, signUp };
};

export default useAuth;
