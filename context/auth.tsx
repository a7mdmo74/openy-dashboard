"use client";
import { useRouter } from "next/navigation";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// User type based on your dummy data
interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  login: (user: AuthenticatedUser, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for cookie management
const setCookie = (name: string, value: string, days?: number) => {
  if (typeof window !== "undefined") {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  }
};

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof window !== "undefined") {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuthStatus = () => {
      const cookieUser = getCookie("authUser");

      const storedUser = localStorage.getItem("authUser");
      const sessionUser = sessionStorage.getItem("authUser");

      let userData = null;

      if (cookieUser) {
        try {
          userData = JSON.parse(decodeURIComponent(cookieUser));
        } catch (error) {
          console.error("Failed to parse cookie user:", error);
          deleteCookie("authUser");
          deleteCookie("rememberMe");
        }
      } else if (storedUser) {
        try {
          userData = JSON.parse(storedUser);
          // Sync with cookies
          setCookie("authUser", encodeURIComponent(storedUser), 30);
          setCookie("rememberMe", "true", 30);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("authUser");
          localStorage.removeItem("rememberMe");
        }
      } else if (sessionUser) {
        try {
          userData = JSON.parse(sessionUser);
          setCookie("authUser", encodeURIComponent(sessionUser));
          setCookie("rememberMe", "false");
        } catch (error) {
          console.error("Failed to parse session user:", error);
          sessionStorage.removeItem("authUser");
        }
      }

      if (userData) {
        setUser(userData);
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData: AuthenticatedUser, rememberMe = false) => {
    setUser(userData);
    const userString = JSON.stringify(userData);

    if (rememberMe) {
      localStorage.setItem("authUser", userString);
      localStorage.setItem("rememberMe", "true");
      setCookie("authUser", encodeURIComponent(userString), 30); // 30 days
      setCookie("rememberMe", "true", 30);
    } else {
      sessionStorage.setItem("authUser", userString);
      setCookie("authUser", encodeURIComponent(userString)); // Session cookie
      setCookie("rememberMe", "false");
    }
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("authUser");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("authUser");

    deleteCookie("authUser");
    deleteCookie("rememberMe");
    router.push("/login");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
