"use client";

import React, { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { Product } from "../../lib/products";
import Link from "next/link";
import { addToWishlist } from "@/app/lib/card";
import { useRouter } from "next/navigation";
import { notifyCartUpdate } from "@/app/lib/updateCardData";

type Props = {
  product: Product;
  gender: string | null;
};

function ProductCard({ product, gender }: Props) {
  const router = useRouter();

  // ✅ stable first variant
  const variant = useMemo(() => {
    return product.variants?.[0] ?? null;
  }, [product.variants]);

  const handleWishlist = useCallback(() => {
    if (!variant) return;

    addToWishlist({
      productId: product.id,
      gender: product.gender,
      variantId: variant.id,
      variantName: variant.name,
      price: variant.price,
      image: variant.mainImage,
      size: "M",
      qty: 1,
      Product_name: variant.Product_name,
      subCategory: product.subCategory,
    });

    window.dispatchEvent(new Event("wishlistUpdated"));
    notifyCartUpdate();
    router.push("/wishlist");
  }, [product.id, product.subCategory, router, variant]);

  if (!variant) return null;

  return (
    <div className="shadow-sm hover:shadow-lg transition">
      <div className="relative overflow-hidden pb-2">
        <Link href={`/product/${variant.Product_name}`}>
          <Image
            src={variant.mainImage}
            alt={variant.Product_name}
            className="w-full sm:h-[240] lg:h-[450] md:h-[350] h-[240] object-cover"
          />
        </Link>

        <button
          onClick={handleWishlist}
          className="absolute top-1 right-3 translate-y-2 rounded-full p-1.5 bg-black/20 text-white cursor-pointer"
        >
          <FaRegHeart />
        </button>
      </div>

      <div className="text-gray-700 px-2 pb-2 text-[10px] md:text-[12px] lg:text-[13px]">
        <p className="truncate text-sm font-medium">
          {variant.Product_name}
        </p>
        <Link href={`/${gender}/${product.subCategory}`}>
          <p className="truncate text-gray-500 font-semibold">{product.subCategory}</p>
        </Link>
        <p className="font-medium text-[12px] text-gray-700">
          <span >Price:</span> {variant.price}
        </p>
      </div>
    </div>
  );
}

export default memo(ProductCard);
