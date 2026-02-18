import { notFound } from "next/navigation";
import ProductPage from "./ListingHeader";
import type { Metadata } from "next";
import { products } from "@/app/lib/products";

type Props = {
  params: {
    userpage?: string;
    slug?: string;
  };
};

const ALLOWED = ["men", "women", "explore"];

function normalize(value: string) {
  const decoded = decodeURIComponent(value);

  return decoded
    .toLowerCase()
    .replace(/:/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isValidCategory(slug: string) {
  const target = normalize(slug);

  return products.some((item) => {
    const category = item.category
      ? normalize(item.category)
      : "";

    const subCategory = item.subCategory
      ? normalize(item.subCategory)
      : "";

    return category === target || subCategory === target;
  });
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const post = (await params)?.slug;
  const gender = (await params)?.userpage;

  if (!post || !gender) notFound();

  const normalizedGender = normalize(gender);

  if (!ALLOWED.includes(normalizedGender)) notFound();

  if (!isValidCategory(post)) notFound();

  return {
    title: `Buy ${decodeURIComponent(post)}`,
    description: "Buy MensWear",
  };
}

export default async function Page({ params }: Props) {

  const post = (await params)?.slug;
  const gender = (await params)?.userpage;

  if (!post || !gender) notFound();

  const normalizedGender = normalize(gender);

  //   FIXED: check gender, not post
  if (!ALLOWED.includes(normalizedGender)) notFound();

  if (!isValidCategory(post)) notFound();

  return <ProductPage />;
}
