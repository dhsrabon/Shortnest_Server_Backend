"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // পেজ রিলোড দিলে ব্যাকএন্ড থেকে ইউজারের সেশন চেক করবে
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.user) {
            setUser(result.user);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // সাধারণ ইমেইল-পাসওয়ার্ড লগইন
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Server error occurred." };
    } finally {
      setLoading(false);
    }
  };

  // 🟢 নতুন যুক্ত করা হলো: Google Login এর ফাংশন
  const googleLogin = async (googleUserData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUserData),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error("Google Login error:", error);
      return { success: false, message: "Server error occurred during Google Login." };
    } finally {
      setLoading(false);
    }
  };

  // লগআউট
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
  };

  return (
    // 🟢 googleLogin ফাংশনটি Provider-এ পাস করা হলো
    <AuthContext.Provider value={{ user, loading, login, googleLogin, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  return user;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}