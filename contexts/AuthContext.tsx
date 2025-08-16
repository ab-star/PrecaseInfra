"use client";
import React, { createContext, useContext, useState } from 'react';
// Simplified stub auth (real firebase auth removed for minimal admin portal)
export interface User { uid: string; email: string | null; displayName?: string | null }

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  // Sample admin credentials (for demo purposes)
  const SAMPLE_ADMIN = {
    email: 'admin@infrastire.com',
    password: 'admin123'
  };

  // Firebase auth listener removed

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
      // Check for sample admin credentials first
      if (email === SAMPLE_ADMIN.email && password === SAMPLE_ADMIN.password) {
        setUser({ uid:'demo', email, displayName:'Admin User'});
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
  // Clear demo session (noop)
      setUser(null);
    } catch {}
  };

  // Check for demo admin session on mount
  // Demo session restore removed

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
