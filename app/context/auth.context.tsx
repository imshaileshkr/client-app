import React, { useContext } from "react";
import { Login, Register } from "../types/auth";

interface AuthType {
  register: (data: Register) => Promise<void>;
  login: (data: Login) => Promise<void>;
}
const AuthContext = React.createContext<AuthType>({
  register: async () => {},
  login: async () => {},
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const register = async () => {};
  const login = async () => {};
  return (
    <AuthContext.Provider value={{ register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
