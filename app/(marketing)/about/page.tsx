

import type { Metadata } from "next";
import About from "./About";

export const metadata: Metadata = {
  title: "About Gangster – Modern Streetwear Clothing Brand",
  description:
    "Gangster is a modern streetwear clothing brand offering premium fashion, oversized t-shirts and urban styles designed for everyday confidence.",
};

export default function AboutPage() {
  return <About />;
}
