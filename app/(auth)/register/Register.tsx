"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type User = {
  id: string;
  Fname: string;
  Lname: string;
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

function saveUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function safeRedirect(url: string | null) {
    if (!url) return "/";
    if (!url.startsWith("/")) return "/";
    return url;
  }

  async function handleRegister() {
    if (!fname || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = getUsers();

    const alreadyExists = users.some(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        u.phone === phone
    );

    if (alreadyExists) {
      alert("User already exists with this email or phone");
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      Fname: fname.trim(),
      Lname: lname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password, // demo only
      createdAt: Date.now(),
    };

    const updated = [...users, newUser];
    saveUsers(updated);

    // auto login after register
    localStorage.setItem(
      "session",
      JSON.stringify({
        userId: newUser.id,
        loggedInAt: Date.now(),
      })
    );

    router.replace(safeRedirect(redirect));
  }

  return (
    <div className="lg:min-h-screen py-10 flex items-center justify-center bg-gray-100 lg:bg-white md:bg-white">
      <div className="bg-gray-100 w-full max-w-md p-8 lg:shadow-sm lg:border md:shadow-sm md:border lg:rounded-xl md:rounded-xl border-gray-300">

        <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
          Register with The Souled Store
        </h2>

        <div className="flex border border-gray-300 rounded-xl overflow-hidden mb-6">
          <Link
            href={
              redirect
                ? `/login?redirect=${encodeURIComponent(redirect)}`
                : "/login"
            }
            className="w-1/2 bg-white text-gray-600 py-2 font-medium text-center"
          >
            LOGIN
          </Link>

          <div className="w-1/2 bg-teal-700 text-white py-2 font-medium text-center">
            REGISTER
          </div>
        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Gmail"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex items-center rounded-xl border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-teal-600 focus-within:border-teal-600">
            <span className="px-3 text-gray-700 text-sm border-r py-2 font-medium">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="Mobile Number"
              className="flex-1 px-2 py-2 text-sm focus:outline-none"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>


          <button
            className="w-full bg-red-500 text-white py-2 rounded-xl font-medium hover:bg-red-600 cursor-pointer"
            onClick={handleRegister}
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}
