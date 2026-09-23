import { clearToken, getToken } from "@/lib/auth-storage";
import type { ApiSuccess } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiSuccess<T>
    | { message?: string }
    | null;

  if (response.status === 401) {
    clearToken();
  }

  if (!response.ok) {
    throw new ApiError(payload?.message ?? "Request failed", response.status);
  }

  return (payload as ApiSuccess<T>).data;
}
