import { createContext } from "react";

export interface User {
  id: number;
  name: string;
}

export interface AuthContextType {
  user: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);
