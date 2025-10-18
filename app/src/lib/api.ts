const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type JsonHeaders = Record<string, string>;

export type ApiError = {
  status: number;
  message: string;
};

export async function fetchJson<T>(
  input: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${input}`, {
    headers: {
      Accept: "application/json",
      ...(init?.headers as JsonHeaders | undefined),
    },
    ...init,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "error" in payload
        ? String(payload.error)
        : response.statusText) || "Request failed";

    const error: ApiError = {
      status: response.status,
      message,
    };
    throw error;
  }

  return (payload ?? (await response.text())) as T;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as ApiError).status === "number" &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

export { API_BASE_URL };
