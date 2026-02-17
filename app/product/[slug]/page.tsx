import ProductPage from "../ProductPage";
import type { Metadata } from "next";
import { products } from "@/app/lib/products";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

function normalize(value: string) {
  const decoded = decodeURIComponent(value);

  return decoded
    .toLowerCase()
    .replace(/:/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function isValidVariantTitle(slug: string) {
  const target = normalize(slug);

  return products.some((item) =>
    item.variants?.some((variant) => {
      if (!variant?.Product_name) return false;

      return normalize(variant.Product_name) === target;
    })
  );
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const id =(await params)?.slug;

  if (!id || !isValidVariantTitle(id)) {
    notFound();
  }

  return {
    title: `Buy : ${decodeURIComponent(id)}`,
    description: "Buy MensWear",
  };
}

export default async function Page({ params }: Props) {

  const id =(await params)?.slug;

  if (!id || !isValidVariantTitle(id)) {
    notFound();
  }

  return <ProductPage />;
}


