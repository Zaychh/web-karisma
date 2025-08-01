// services/auth.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Setup axios instance dengan base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface untuk response login
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    user_id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
  redirectUrl: string;
}

// Interface untuk response register
interface RegisterResponse {
  success: boolean;
  message: string;
  user_id?: number;
}

// Login function
export const login = async (identifier: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      identifier,
      password,
    });
    
    return response;
  } catch (error) {
    // Re-throw error agar bisa di-handle di component
    throw error;
  }
};

// Register function
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return { success: true };
  } catch (error) {
    // Even if API call fails, clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error;
  }
};

// Get current user function
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    // Simple check - decode dan lihat expiry (optional)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      // Token expired, remove from storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

// Get user role from token
export const getUserRole = (): 'admin' | 'user' | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

export default api;