import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { loginWithCredentials } from '@/lib/authApi';
import { ApiError } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'auth_session';

interface StoredSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: StoredSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadSession()?.user ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate session on mount (handles page refresh)
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setUser(session.user);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { accessToken, refreshToken, user: loggedInUser } = await loginWithCredentials(email, password);
      saveSession({ accessToken, refreshToken, user: loggedInUser });
      setUser(loggedInUser);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403 && err.code === 'INVITE_REQUIRED') {
        setError('This is an invite-only platform. Your account has not been activated yet. Please contact your administrator.');
      } else if (err instanceof ApiError && err.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Unable to sign in. Please try again later.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
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
