import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import type { ReactNode } from 'react';

// Konsistenkan dengan auth.ts - gunakan /api sebagai base
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  bio?: string;
  phone?: string;
  location?: string;
  image?: string;
}

interface DecodedToken {
  user_id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUserData: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from backend
  const fetchUserData = async (authToken: string) => {
    try {
      console.log('🔄 Fetching user data with token...');
      // Hapus /api karena sudah ada di API_BASE_URL
      const response = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      console.log('✅ User data fetched:', response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch user data:', error);
      // Jika token invalid, logout
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          console.log('🔒 Invalid or expired token, logging out');
          logout();
        }
      }
      return null;
    }
  };

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // Check if token is expired
          const decoded = jwtDecode<DecodedToken>(storedToken);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            console.log('🔒 Token expired, logging out');
            logout();
          } else {
            console.log('🔑 Valid token found, fetching user data');
            setToken(storedToken);
            await fetchUserData(storedToken);
          }
        } catch (error) {
          console.error('❌ Invalid token, logging out');
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (newToken: string) => {
    try {
      console.log('🔐 Logging in with token...');
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Decode token to get basic user info
      const decoded = jwtDecode<DecodedToken>(newToken);
      
      // Set basic user info first
      setUser({
        user_id: decoded.user_id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      });
      
      // Then fetch complete user data
      await fetchUserData(newToken);
      
      console.log('✅ Login successful');
    } catch (error) {
      console.error('❌ Login failed:', error);
      logout();
    }
  };

  // Logout function
  const logout = () => {
    console.log('🔓 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Refresh user data
  const refreshUser = async () => {
    if (token) {
      console.log('🔄 Refreshing user data...');
      await fetchUserData(token);
    }
  };

  // Update user data in context (optimistic update)
  const updateUserData = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    refreshUser,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};