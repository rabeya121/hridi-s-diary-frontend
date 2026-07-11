"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("hd_token");
    const storedUser = localStorage.getItem("hd_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.post("/auth/login", { email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("hd_token", data.token);
    localStorage.setItem("hd_user", JSON.stringify(data.user));
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.post("/auth/register", { name, email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("hd_token", data.token);
    localStorage.setItem("hd_user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("hd_token");
    localStorage.removeItem("hd_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};