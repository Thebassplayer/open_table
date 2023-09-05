"use client";
import { useState, createContext, useEffect } from "react";
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
          isError: false, // Reset the error state on success
          errorData: null, // Clear the error data on success
        });
      }
    } catch (error: any) {
      let errorMessage = axios.isAxiosError(error)
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

  useEffect(() => {
    const clearError = setTimeout(() => {
      updateAuthState({
        isError: false, // Clear the error state after 3 seconds
        errorData: null, // Clear the error data after 3 seconds
      });
    }, 3000);
    return () => clearTimeout(clearError);
  }, [authState.isError]);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
