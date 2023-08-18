"use client";
import React, { useState, createContext } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

interface AuthState {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthenticationContext = createContext<AuthContextProps>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    data: null,
    error: null,
  });
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
