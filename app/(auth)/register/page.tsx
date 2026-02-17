import type { Metadata } from "next";
import Register from "./Register";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register | Gangster",
  description: "Login to your Gangster account",
};

export default function Page() {
    return (
        <Suspense fallback={null}>
          <Register />;
        </Suspense>
    );
}
