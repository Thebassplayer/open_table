"use client";
import { useState, createContext, useEffect } from "react";
// Next
import { getCookie } from "cookies-next";
// Custom Hooks
import axios, { AxiosResponse } from "axios";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

interface AuthState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: User | null;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthenticationContext = createContext<AuthContextProps>({
  data: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    data: null,
    isSuccess: false,
    isLoading: true,
    isError: false,
    error: null,
  });

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

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
