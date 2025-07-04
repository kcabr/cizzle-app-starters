// Django authentication utilities

const API_BASE_URL = "http://localhost:8000";

// Helper to get current frontend URL
const getFrontendUrl = () => {
  return typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";
};

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

// Auth API functions
export const authApi = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Store tokens
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    }

    return data;
  },

  async register(userData: RegisterData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },

  async getCurrentUser(): Promise<User> {
    // First try with session cookie (for OAuth users)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      // Continue to JWT fallback
    }

    // Fallback to JWT token
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!token) {
      throw new Error("No authentication found");
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          return this.getCurrentUser();
        }
      }
      throw new Error("Failed to get user info");
    }

    return response.json();
  },

  async refreshToken(): Promise<boolean> {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refresh_token")
        : null;

    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      const data = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", data.access);
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  async logout() {
    // Clear JWT tokens
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    // Clear Django session
    try {
      await fetch(`${API_BASE_URL}/accounts/logout/`, {
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    window.location.href = "/";
  },

  isAuthenticated(): boolean {
    // Check for either JWT token or try to validate with server
    return typeof window !== "undefined"
      ? !!localStorage.getItem("access_token")
      : false;
  },

  getAuthHeaders(): HeadersInit {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// OAuth login URLs with redirect parameter
export const getGoogleLoginUrl = (redirectTo?: string) => {
  const url = new URL(`${API_BASE_URL}/accounts/google/login/`);
  if (redirectTo && typeof window !== "undefined") {
    // Store redirect URL in sessionStorage for callback
    sessionStorage.setItem("auth_redirect", redirectTo);
  }
  return url.toString();
};

export const getGithubLoginUrl = (redirectTo?: string) => {
  const url = new URL(`${API_BASE_URL}/accounts/github/login/`);
  if (redirectTo && typeof window !== "undefined") {
    sessionStorage.setItem("auth_redirect", redirectTo);
  }
  return url.toString();
};

// Logout URL
export const getLogoutUrl = () => `${API_BASE_URL}/accounts/logout/`;

export type { User, LoginResponse, RegisterData };
