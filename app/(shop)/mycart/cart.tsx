"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import SizeDropdown from "../../components/ButtonComponents/SizeDropdown";
import OtyButton from "@/app/components/ButtonComponents/OtyButton";
import { notifyCartUpdate } from "@/app/lib/updateCardData";
import { addToWishlist, CartItem } from "@/app/lib/card";
import Defaultlayout from "../Defaultlayout";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/components/Custom/Hook/useAuth"; 

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    notifyCartUpdate();
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  // build redirect back to cart
  const redirectTarget = useMemo(() => {
    return searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
  }, [pathname, searchParams]);

  const loginLink = `/login?redirect=${encodeURIComponent(redirectTarget)}`;

  const handlePlaceOrder = () => {
    //   if not logged in → go to login
    if (!isLoggedIn) {
      router.push(loginLink);
      return;
    }

    //   logged in → go to checkout
    router.push("/checkout");
  };

  return (
    <main className="Mycards py-6">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT – Cart Items */}
          <div className="flex-1 border rounded-md">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b text-sm">
              <span className="font-medium">{cart.length}</span>
              <span className="text-gray-500">
                {cart.length >= 2 ? "items" : "item"}
              </span>
            </div>

            {cart.map((item, index) => (
              <div key={index} className={`${cart.length > 1 ? "border-b" : ""}`}>
                <div className="relative flex gap-4 p-4">
                  <Image
                    src={item.image}
                    alt={item.Product_name}
                    className="object-cover rounded px-2 w-40 h-"
                  />

                  <div className="flex flex-col lg:flex-row justify-between w-full lg:gap-4 md:gap-3 gap-1">
                    <div className="text-[12px] lg:text-sm">
                      <p className="font-medium">
                        {item.Product_name} – {item.variantName}
                      </p>

                      <p className="text-sm text-gray-500">
                        Size : {item.size}
                      </p>

                      <p className="mt-1 font-semibold">₹ {item.price}</p>

                      <div className="flex gap-3 mt-3">
                        <SizeDropdown
                          value={item.size}
                          onChange={(newsize) => {
                            const updated = [...cart];
                            updated[index] = {
                              ...updated[index],
                              size: newsize,
                            };

                            setCart(updated);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updated)
                            );
                          }}
                        />
                        <OtyButton
                          value={item.qty}
                          onChange={(newQty) => {
                            const updated = [...cart];
                            updated[index] = {
                              ...updated[index],
                              qty: newQty,
                            };

                            setCart(updated);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updated)
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ₹ {item.price * item.qty}
                      </p>
                      <p className="text-xs text-gray-500">
                        MRP inclusive of all taxes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:justify-end md:justify-end sm:justify-end justify-evenly gap-4 py-2 px-4">
                  <button
                    onClick={() => removeItem(index)}
                    className="border cursor-pointer border-gray-500 px-4 py-1.5 text-gray-500 rounded-xl lg:text-sm md:text-sm text-[10px] font-medium"
                  >
                    Remove
                  </button>

                  <button
                    className="border cursor-pointer border-gray-500 px-4 py-1.5 text-gray-500 rounded-xl lg:text-sm md:text-sm text-[10px] font-medium"
                    onClick={() => {
                      addToWishlist({
                        productId: item.productId,
                        gender : item.gender,
                        Product_name: item.Product_name,
                        variantId: item.variantId,
                        variantName: item.variantName,
                        price: item.price,
                        size: item.size,
                        qty: item.qty,
                        image: item.image,
                        subCategory: item.subCategory,
                      });
                      window.dispatchEvent(new Event("wishlistUpdated"));
                      router.push("/wishlist");
                      notifyCartUpdate();
                      removeItem(index);
                    }}
                  >
                    wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – Summary */}
          <div className="w-full lg:w-80">
            <div className="border rounded-md bg-white">
              <h2 className="px-4 py-3 text-sm font-semibold text-gray-500 border-b">
                BILLING DETAILS
              </h2>

              <div className="px-2 lg:px-4 text-[12px] lg:text-sm">
                <div className="flex justify-between py-2 lg:py-3 border-b">
                  <span>Cart Total</span>
                  <span className="font-medium">
                    ₹ {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 lg:py-3 border-b">
                  <span>GST (5%)</span>
                  <span className="font-medium">₹ {gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-2 lg:py-3 border-b">
                  <span>Shipping Charges</span>
                  <span className="flex items-center gap-2 font-medium">
                    <span className="text-teal-700">Free</span>
                    <span className="line-through text-gray-400">
                      ₹ 50.00
                    </span>
                  </span>
                </div>

                <div className="flex justify-between py-4 font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>
              </div>

              {/*   Place order button with login check */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-teal-700 text-white py-3 text-sm font-semibold rounded-b-md opacity-90 cursor-pointer"
              >
                PLACE ORDER
              </button>

              {!isLoggedIn && (
                <p className="text-center text-xs text-red-400 py-2">
                  Please login to place your order
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Defaultlayout />
      )}
    </main>
  );
}
