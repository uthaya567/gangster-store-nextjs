import type { Metadata } from "next";
import Login from "./Login";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | Gangster",
  description: "Login to your Gangster account",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
       <Login />;
    </Suspense>
  )
}
