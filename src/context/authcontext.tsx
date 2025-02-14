import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import axiosInstance from "../helper/axiosInstance";

// Define user type
interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

// Define context types
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance
      .get(`/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = () => {
    window.location.href = `http://localhost:8000/auth/google`;
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
