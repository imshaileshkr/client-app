"use client";
import React, { useContext, useState } from "react";
import { Login, Register } from "../types/auth";
import { toast } from "react-toastify";
import { AxiosProvider } from "../AxiosProvider";

interface AuthType {
  isLoading: boolean;
  register: (data: Register) => Promise<void>;
  login: (data: Login) => Promise<void>;
  logout: () => void;
  profile: any;
  getProfile: (data?: string) => Promise<void>;
}
const AuthContext = React.createContext<AuthType>({
  register: async () => {},
  login: async () => {},
  isLoading: false,
  logout: () => {},
  profile: {},
  getProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Sets the user data in the local storage. The user data is
   * stringified and stored in the "user" key, and the access token
   * is stored in the "access_token" key.
   * @param user - The user data to store in the local storage.
   * @param access_token - The access token to store in the local storage.
   */
  const setLocalStorage = (user: any, access_token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", access_token);
  };

  /**
   * Sends a POST request to the specified URL with the given payload.
   * Sets the `isLoading` state to `true` and sets the user data in the
   * local storage if the request is successful.
   * @param url - The URL to send the request to.
   * @param payload - The payload to send in the request body.
   * @throws {Error} If there is an error with the request.
   * @returns {Promise<void>}
   */
  const handleRequest = async (url: string, payload: Register | Login) => {
    try {
      setIsLoading(true);
      const res = await AxiosProvider.post(url, payload);
      const response = res.data;
      setLocalStorage(response.user, response.access_token);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registers a new user with the provided registration data.
   *
   * @param payload - The registration data, which includes email,
   * username, password, and confirmPassword.
   * @returns A promise that resolves once the registration request
   * has been processed.
   */

  const register = async (payload: Register) => {
    await handleRequest("user/register", payload);
  };

  /**
   * Logs in an existing user with the provided login data.
   *
   * @param payload - The login data, which includes email and password.
   * @returns A promise that resolves once the login request has been processed.
   */
  const login = async (payload: Login) => {
    await handleRequest("user/login", payload);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  const getProfile = async () => {
    try {
      const res = await AxiosProvider.get(`user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const response = res.data;
    } catch (error) {}
  };
  return (
    <AuthContext.Provider
      value={{ register, login, isLoading, logout, getProfile, profile: {} }}
    >
      {children}
    </AuthContext.Provider>
  );
};
