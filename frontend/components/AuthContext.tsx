// src/components/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<any>({}); // Using 'any' temporarily for simplicity; refine later

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // Add userId state
  const navigate = useNavigate();

  // Check if the user is authenticated on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId'); // Assuming userId is stored on login
    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  // Login function
  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token); // Store the token
    localStorage.setItem('userId', userId); // Store the userId
    setIsAuthenticated(true);
    setToken(token);
    setUserId(userId);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('userId'); // Remove userId
    setIsAuthenticated(false);
    setToken(null);
    setUserId(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;