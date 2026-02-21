import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import * as authApi from '@/lib/authApi';
import { ApiError } from '@/lib/api';

function wrapper({ children }: { children: ReactNode }) {
  return React.createElement(AuthProvider, null, children);
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('AuthContext', () => {
  describe('login', () => {
    it('stores session and sets user on successful login', async () => {
      const fakeUser = {
        id: '1',
        email: 'user@test.com',
        name: 'Test User',
        role: 'super_admin' as const,
        createdAt: new Date(),
      };
      vi.spyOn(authApi, 'loginWithCredentials').mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: fakeUser,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('user@test.com', 'password');
      });

      expect(result.current.user).toMatchObject({ email: 'user@test.com' });
      expect(result.current.isAuthenticated).toBe(true);
      expect(JSON.parse(localStorage.getItem('auth_session')!)).toMatchObject({
        accessToken: 'access-token',
      });
    });

    it('surfaces invite-only message and does not store tokens on INVITE_REQUIRED error', async () => {
      vi.spyOn(authApi, 'loginWithCredentials').mockRejectedValue(
        new ApiError(403, 'Forbidden', 'INVITE_REQUIRED'),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        try {
          await result.current.login('pending@test.com', 'password');
        } catch {
          // expected
        }
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(localStorage.getItem('auth_session')).toBeNull();
      expect(result.current.error).toMatch(/invite-only/i);
    });

    it('surfaces invalid credentials message on 401 error', async () => {
      vi.spyOn(authApi, 'loginWithCredentials').mockRejectedValue(
        new ApiError(401, 'Unauthorized'),
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        try {
          await result.current.login('bad@test.com', 'wrong');
        } catch {
          // expected
        }
      });

      expect(result.current.user).toBeNull();
      expect(result.current.error).toMatch(/invalid email or password/i);
    });

    it('clears user and session on logout', async () => {
      const fakeUser = {
        id: '1',
        email: 'user@test.com',
        name: 'Test User',
        role: 'super_admin' as const,
        createdAt: new Date(),
      };
      vi.spyOn(authApi, 'loginWithCredentials').mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: fakeUser,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('user@test.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(localStorage.getItem('auth_session')).toBeNull();
    });
  });
});
