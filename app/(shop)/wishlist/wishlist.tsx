"use client";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { CartItem } from "@/app/lib/card";
import { useRouter } from "next/navigation";
import Defaultlayout from "../Defaultlayout";
import { addToCart } from "@/app/lib/card";
import Link from "next/link";
export default function Wishlist() {
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  const removeItem = (index: number) => {
    const updated = [...wishlist];
    updated.splice(index, 1);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // optional (only if you have a wishlist badge)
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <section className="max-w-7xl mx-auto lg:px-30 md:px-20 px-2">
      {wishlist.length > 0 ? (<h2 className="text-xl font-semibold mb-2 lg:pt-8">
        My Wishlist{" "}
        <span className="text-gray-500 font-normal">
          ({wishlist.length} items)
        </span>
      </h2>) : ""}

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-5 gap-3 px-2 py-4 text-[8px] lg:text-[13px] md:text-[12px]">
          {wishlist.map((item, index) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="border border-gray-200"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Link href={`/product/${item.Product_name}`}>
                  <Image
                    src={item.image}
                    alt={item.Product_name}
                    className="w-full lg:h-[300] md:h-[200] h-[200] object-cover"
                  />
                </Link>

                {/* Remove icon */}
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-1 right-1 bg-white/50 rounded-full p-1 shadow"
                >
                  <FiX />
                </button>
              </div>

              {/* Content */}
              <div className="p-2 space-y-1">
                <h3 className="font-semibold lg:text-lg text-[12px] truncate">
                  {item.Product_name}
                </h3>
                  <Link href={`/${item.gender}/${item.subCategory}`}>
                  <p className="text-xs lg:text-sm text-gray-500 truncate font-semibold">
                    {item.subCategory}
                  </p>
                </Link>
                <p className="font-semibold text-[14px] text-gray-700"><span>₹Price</span> :  {item.price}</p>
              </div>

              {/* Move to cart */}
              <button
                className="w-full border-t py-2 text-sm font-semibold text-teal-700 hover:bg-gray-50"
                onClick={() => {
                  addToCart({
                    productId: item.productId,
                    gender : item.gender,
                    variantId: item.variantId,
                    variantName: item.variantName,
                    Product_name: item.Product_name,
                    image: item.image,
                    price: item.price,
                    size: item.size,
                    qty: item.qty,
                    subCategory : item.subCategory

                  });

                  removeItem(index);
                  router.push("/mycart");
                }}
              >
                MOVE TO CART
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Defaultlayout />
      )}
    </section>
  );
}


