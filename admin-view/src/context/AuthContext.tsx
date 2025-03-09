import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  username: string | null;
  login: (token: string, uname: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Load authentication state from localStorage
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem("username")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("accessToken")
  );

  // Effect to update authentication state if localStorage changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const uname = localStorage.getItem("username");

    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUsername(uname);
    }
  }, []);

  const login = (token: string, uname: string) => {
    setIsAuthenticated(true);
    setAccessToken(token);
    setUsername(uname);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", uname);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUsername(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/signin", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, username, login, logout }}
    >
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
