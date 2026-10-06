'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types/user';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  customer: {
    id: 'user-demo-cust',
    email: 'demo@thari.local',
    name: 'Ananya Rao',
    role: 'customer',
    phone: '+91 98401 23456',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    created_at: '2024-01-01T00:00:00Z',
  },
  seller: {
    id: 'user-seller-1',
    email: 'seller@thari.local',
    name: 'Sundaram Master Weaver',
    role: 'seller',
    phone: '+91 94432 98765',
    seller_id: 'seller-1',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    created_at: '2023-01-15T00:00:00Z',
  },
  admin: {
    id: 'user-admin-1',
    email: 'admin@thari.local',
    name: 'THARI Marketplace Director',
    role: 'admin',
    phone: '+91 99000 11223',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    created_at: '2022-12-01T00:00:00Z',
  },
};

const AuthContext = createContext<AuthContextType>({
  user: DEMO_USERS.customer,
  role: 'customer',
  isAuthenticated: true,
  isDemoMode: true,
  login: async () => true,
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS.customer);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('thari_current_user');
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        localStorage.setItem('thari_current_user', JSON.stringify(DEMO_USERS.customer));
      }
    } catch {
      setUser(DEMO_USERS.customer);
    }
  }, []);

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    let targetRole: UserRole = role || 'customer';
    if (email.includes('admin')) targetRole = 'admin';
    else if (email.includes('seller')) targetRole = 'seller';

    const matchedUser = DEMO_USERS[targetRole] || {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: targetRole,
      created_at: new Date().toISOString(),
    };

    setUser(matchedUser);
    localStorage.setItem('thari_current_user', JSON.stringify(matchedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('thari_current_user');
  };

  const switchRole = (newRole: UserRole) => {
    const newUser = DEMO_USERS[newRole];
    setUser(newUser);
    localStorage.setItem('thari_current_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'customer',
        isAuthenticated: !!user,
        isDemoMode: true,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
