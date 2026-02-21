import { apiFetch } from './api';
import { User } from '@/types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

/** Shape the API may return before normalization */
interface RawApiUser extends Omit<User, 'name'> {
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface RawLoginResponse extends AuthTokens {
  user: RawApiUser;
}

function normalizeUser(raw: RawApiUser): User {
  const name =
    raw.name ??
    ([raw.firstName, raw.lastName].filter(Boolean).join(' ') || raw.email);
  return { ...raw, name } as User;
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const raw = await apiFetch<RawLoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return { ...raw, user: normalizeUser(raw.user) };
}
