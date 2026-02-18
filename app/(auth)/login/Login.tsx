"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/Custom/Hook/useAuth"; 

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: number;
};

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("users");
  return raw ? JSON.parse(raw) : [];
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); //   use hook

  const rawRedirect = searchParams.get("redirect");
  const redirect = rawRedirect ? decodeURIComponent(rawRedirect) : null;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  function safeRedirect(url: string | null) {
    if (!url) return "/";
    if (!url.startsWith("/")) return "/";
    return url;
  }

  function handleLogin() {
    if (!identifier || !password) {
      alert("Enter credentials");
      return;
    }

    const users = getUsers();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === identifier.toLowerCase() ||
        u.phone === identifier
    );

    if (!user) {
      alert("User not found");
      return;
    }

    if (user.password !== password) {
      alert("Invalid password");
      return;
    }

    //   single source of truth
    login({
      userId: user.id,
      name: user.name,
    });

    router.replace(safeRedirect(redirect));
  }

  return (
    <div className="lg:min-h-screen py-10 flex items-center justify-center bg-gray-100 lg:bg-white md:bg-white">
      <div className="bg-gray-100 w-full max-w-md p-8 lg:shadow-sm lg:border md:shadow-sm md:border lg:rounded-xl md:rounded-xl border-gray-300">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
          Login with The Ganster Store
        </h2>

        <div className="flex border border-gray-300 rounded-xl overflow-hidden mb-6">
          <div className="w-1/2 bg-teal-700 text-white py-2 font-medium text-center">
            LOGIN
          </div>

          <Link
            href={
              redirect
                ? `/register?redirect=${encodeURIComponent(redirect)}`
                : "/register"
            }
            className="w-1/2 bg-white text-gray-600 py-2 font-medium text-center"
          >
            REGISTER
          </Link>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="phone number or gmail"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-red-500 text-white py-2 rounded-xl font-medium"
            onClick={handleLogin}
          >
            PROCEED
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          New User?{" "}
          <Link
            className="text-red-500 hover:underline"
            href={
              redirect
                ? `/register?redirect=${encodeURIComponent(redirect)}`
                : "/register"
            }
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
