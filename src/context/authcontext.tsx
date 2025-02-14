import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import axiosInstance from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";

// Define user type
interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isAuthenticated: boolean;
}

// Define context types
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const navigate= useNavigate();

  useEffect(() => {
    authCheck();
  }, []);

  const login = () => {
    window.location.href = `https://url-shortner-aqh9.onrender.com/auth/google`;
  };
  const authCheck = () => {
    setLoading(true);
    axiosInstance
      .get("/auth/check", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    await axiosInstance
      .post(`https://url-shortner-aqh9.onrender.com/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login')
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("please wrap the app with the provider");
  }
  return context;
};
