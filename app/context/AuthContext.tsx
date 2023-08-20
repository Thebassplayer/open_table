"use client";
import React, { useState, createContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { AuthContextProps, AuthState } from "@/types/auth";

export const AuthenticationContext = createContext<AuthContextProps>({
  userData: null,
  isSignIn: false,
  isSignUp: false,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isFetchingUserState: false,
  errorData: null,
  setAuthState: () => {},
});

const AuthContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialAuthState: AuthState = {
    userData: null,
    isSignIn: false,
    isSignUp: false,
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    isFetchingUserState: true,
    errorData: null,
  };

  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  console.log("isLoggedIn: ", authState.isLoggedIn);

  const updateAuthState = (newState: Partial<AuthState>): void => {
    setAuthState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        updateAuthState({
          isLoading: false,
          isFetchingUserState: false,
        });
      } else {
        const response: AxiosResponse<User> = await axios.get<User>(
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        updateAuthState({
          userData: response.data,
          isLoggedIn: true,
          isLoading: false,
          isFetchingUserState: false,
        });
      }
    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data.message
        : error.message;

      updateAuthState({
        isError: true,
        isLoading: false,
        isFetchingUserState: false,
        errorData: errorMessage,
      });
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
