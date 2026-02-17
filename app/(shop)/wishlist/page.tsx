
import type { Metadata } from "next";
import Wishlist from "./wishlist";

export const metadata: Metadata = {
  title: "My wishlist | Gangster – Modern Streetwear Clothing Brand",
  description:
    "Gangster is a modern streetwear clothing brand offering premium fashion, oversized t-shirts and urban styles designed for everyday confidence.",
};

export default function wishlistPage() {
  return <Wishlist />;
}
