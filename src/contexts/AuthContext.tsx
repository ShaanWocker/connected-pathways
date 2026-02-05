import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const DEMO_USERS: Record<string, User> = {
  'super@neurobridge.edu': {
    id: '1',
    email: 'super@neurobridge.edu',
    name: 'Sarah Mitchell',
    role: 'super_admin',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
  },
  'school@oakwood.edu': {
    id: '2',
    email: 'school@oakwood.edu',
    name: 'James Peterson',
    role: 'school_admin',
    institutionId: 'inst-1',
    createdAt: new Date('2024-02-15'),
    lastLoginAt: new Date(),
  },
  'tutor@brighthorizons.edu': {
    id: '3',
    email: 'tutor@brighthorizons.edu',
    name: 'Dr. Emily Chen',
    role: 'tutor_centre_admin',
    institutionId: 'inst-2',
    createdAt: new Date('2024-03-10'),
    lastLoginAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = DEMO_USERS[email.toLowerCase()];
    
    if (demoUser && password === 'demo123') {
      setUser({ ...demoUser, lastLoginAt: new Date() });
      setIsLoading(false);
    } else {
      setError('Invalid email or password. Try demo accounts with password: demo123');
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
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

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return { authorized: false, reason: 'not_authenticated' as const };
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return { authorized: false, reason: 'insufficient_permissions' as const };
  }
  
  return { authorized: true, user };
}
