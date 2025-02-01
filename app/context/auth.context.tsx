"use client";
import React, { useContext, useState } from "react";
import { Login, Register } from "../types/auth";
import { toast } from "react-toastify";
import { AxiosProvider } from "../AxiosProvider";

interface AuthType {
  isLoading: boolean;
  register: (data: Register) => Promise<void>;
  login: (data: Login) => Promise<void>;
}
const AuthContext = React.createContext<AuthType>({
  register: async () => {},
  login: async () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const register = async (payload: Register) => {
    setIsLoading(true);
    try {
      const res = await AxiosProvider.post("user/register", payload);
      localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
      localStorage.setItem("access_token", res?.data?.token);
      toast.success("Registration successful");
      return res?.data?.data?.user;
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async () => {
    setIsLoading(true);

    try {
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ register, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
