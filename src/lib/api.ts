const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = {
  async get(endpoint: string, token?: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  },

  async post(endpoint: string, body: unknown, token?: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `API error: ${res.status}`);
    }
    return res.json();
  },

  async delete(endpoint: string, token?: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  },

  async patch(endpoint: string, body: unknown, token?: string) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  },
};
