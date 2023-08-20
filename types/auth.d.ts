export interface AuthState {
  userData: User | null;
  errorData: string | null;
  isLoading: boolean;
  isSignIn?: boolean;
  isSignUp?: boolean;
  isLoggedIn?: boolean;
  isFetchingUserState?: boolean;
  isError: boolean;
}

export interface AuthContextProps extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}
