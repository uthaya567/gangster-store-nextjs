

import type { Metadata } from "next";
import Cart from "./cart";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Cart | Gangster – Modern Streetwear Clothing Brand",
  description:
    "Gangster is a modern streetwear clothing brand offering premium fashion, oversized t-shirts and urban styles designed for everyday confidence.",
};

export default function CartPage() {
  return (
      <Suspense fallback={null}>
         <Cart />;
      </Suspense>
  );
}
