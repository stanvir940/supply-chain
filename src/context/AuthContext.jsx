// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
  }, []);

  const login = async (form) => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      console.log("User logged in:", res.data.user);
      setIsLoggedIn(true);
      return { success: true };
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
      return { success: false };
    }
  };

  const register = async (form) => {
    try {
      await API.post("/register", form);
      setMessage("Registration successful! Please login.");
      return { success: true };
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setMessage("");
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/me");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        message,
        login,
        logout,
        register,
        fetchProfile,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => useContext(AuthContext);
