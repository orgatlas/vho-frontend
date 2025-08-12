import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getUser as apiGetUser } from '../services/api';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userData = await apiGetUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user from token:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleAuthResponse = (data: AuthResponse) => {
    localStorage.setItem('authToken', data.token);
    setUser(data.user);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      handleAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      handleAuthResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout(); // Call API logout (optional, depends on backend)
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
