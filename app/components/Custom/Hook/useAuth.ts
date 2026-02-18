"use client";

import { useState, useEffect, useCallback } from "react";

type Session = {
  userId: string;
  name?: string;
  loggedInAt: number;
};

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  const loadSession = useCallback(() => {
    if (typeof window === "undefined") return;

    const raw = localStorage.getItem("session");

    if (!raw) {
      setSession(null);
      setIsLoggedIn(false);
      return;
    }

    try {
      const parsed: Session = JSON.parse(raw);
      setSession(parsed);
      setIsLoggedIn(true);
    } catch {
      setSession(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    loadSession();

    const handleStorage = () => loadSession();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [loadSession]);

  const login = (user: { userId: string; name?: string }) => {
    const newSession: Session = {
      ...user,
      loggedInAt: Date.now(),
    };

    localStorage.setItem("session", JSON.stringify(newSession));

    //   cookie for middleware
    document.cookie = "auth=1; path=/";

    loadSession();
  };

  const logout = () => {
    localStorage.removeItem("session");

    //   remove cookie for middleware
    document.cookie = "auth=; path=/; max-age=0";

    setSession(null);
    setIsLoggedIn(false);
  };

  const getUser = () => session;

  return { isLoggedIn, session, login, logout, getUser };
}
