const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3001/api/v1';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    let code: string | undefined;
    try {
      const body = await res.json();
      const raw = body?.code;
      code = typeof raw === 'string' ? raw : undefined;
    } catch {
      // ignore JSON parse errors
    }
    throw new ApiError(res.status, res.statusText, code);
  }

  return res.json() as Promise<T>;
}
