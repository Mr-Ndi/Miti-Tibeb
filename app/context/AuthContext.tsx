'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchApi } from '@/lib/api';

interface User {
  email: string;
  role: 'admin' | 'vendor' | 'client';
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  registerVendor: (data: VendorRegisterData) => Promise<void>;
  logout: () => void;
  inviteVendor: (data: InviteVendorData) => Promise<void>;
}

interface RegisterData {
  ClientFirstName: string;
  ClientOtherName: string;
  ClientEmail: string;
  ClientPassword: string;
}

interface VendorRegisterData {
  VendorPassword: string;
  VendorTin: string;
  ShopName: string;
  token: string;
}

interface InviteVendorData {
  VendorEmail: string;
  VendorFirstName: string;
  VendorOtherName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      fetchApi<User>('/user/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await fetchApi<User>('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      setUser(data);
      localStorage.setItem('token', data.token || '');
    } catch (e) {
      setError('Login failed. Please check your credentials.');
      throw e;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      await fetchApi('/user/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (e) {
      setError('Registration failed. Please try again.');
      throw e;
    }
  };

  const registerVendor = async (data: VendorRegisterData) => {
    try {
      setError(null);
      await fetchApi('/vendor/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (e) {
      setError('Vendor registration failed. Please try again.');
      throw e;
    }
  };

  const inviteVendor = async (data: InviteVendorData) => {
    try {
      setError(null);
      await fetchApi('/admin/invite', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (e) {
      setError('Failed to invite vendor. Please try again.');
      throw e;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      registerVendor,
      logout,
      inviteVendor
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 