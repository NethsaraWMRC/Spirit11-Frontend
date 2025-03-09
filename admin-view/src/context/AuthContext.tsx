import React, { createContext, useContext, useState, ReactNode } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const navigate = useNavigate();

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
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
