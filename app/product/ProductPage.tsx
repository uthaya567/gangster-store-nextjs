"use client";

import { products } from "../lib/products";
import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { addToCart, addToWishlist } from "@/app/lib/card";
import { notifyCartUpdate } from "@/app/lib/updateCardData";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";
import Link from "next/link";
const artistText = `
The Souled Store was born out of a simple idea - love what you do and follow your soul.
Thus, our goal is to give everyone something they'll love, something they can use to
express themselves, and simply put, something to put a smile on their face.

So, whether it's superheroes like Superman, TV shows like F.R.I.E.N.D.S, pop culture,
music, sports, or quirky, funny stuff you're looking for, we have something for everyone.

TSS Originals or The Souled Store Originals is our exclusive range of funny, funky, trendy
and stylish designs. Designed by our kick-ass team of in-house designers, TSS Originals
are some cool and quirky designs that help you speak your vibe.
`;
export default function ProductPage() {
  const { setSection } = useSection();
  const params = useParams();
  const router = useRouter();

  //   memoized product lookup
  const result = useMemo(() => {
    const slug = decodeURIComponent(params.slug as string)
      .toLowerCase()
      .trim();

    for (const p of products) {
      const index = p.variants.findIndex(
        v => v.Product_name.toLowerCase().trim() === slug
      );

      if (index !== -1) {
        return {
          product: p,
          variantIndex: index
        };
      }
    }

    return null;
  }, [params.id]);

  const product = result?.product;


  useEffect(() => {
    if (!product) return;

    if (product.gender === "MEN" || product.gender === "WOMEN") {
      setSection(product.gender);
    }
  }, [product, setSection]);

  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [danger, setDanger] = useState(false);
  const [open, setOpen] = useState<null | "pd" | "desc" | "artist">(null);

  // -------------------------
  // memoized derived data
  // -------------------------

  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants[variantIndex];
  }, [product, variantIndex]);

  const images = useMemo(() => {
    return selectedVariant?.lookImages ?? [];
  }, [selectedVariant]);

  const title = selectedVariant?.Product_name ?? "";
  const price = selectedVariant?.price ?? 0;

  // -------------------------
  // handlers
  // -------------------------

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedVariant) return;

    if (!size) {
      setDanger(true);
      return;
    }

    addToCart({
      productId: product.id,
      gender : product.gender,
      Product_name: selectedVariant.Product_name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      size,
      qty,
      image: selectedVariant.mainImage,
      subCategory: product.subCategory,
    });

    router.push("/mycart");
    notifyCartUpdate();
  }, [product, selectedVariant, size, qty, router]);

  const handleAddToWishlist = useCallback(() => {
    if (!product || !selectedVariant) return;

    if (!size) {
      setDanger(true);
      return;
    }

    addToWishlist({
      productId: product.id,
      gender : product.gender,
      Product_name: selectedVariant.Product_name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      size,
      qty,
      image: selectedVariant.mainImage,
      subCategory: product.subCategory,
    });

    window.dispatchEvent(new Event("wishlistUpdated"));
    router.push("/wishlist");
    notifyCartUpdate();
  }, [product, selectedVariant, size, qty, router]);

  const handleVariantChange = useCallback((index: number) => {
    setVariantIndex(index);
    setImageIndex(0);
    setSize(null);
    setDanger(false);
  }, []);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="px-6 xl:px-12 py-10">
      <div className="flex flex-col md:flex-row lg:flex-row gap-10 items-start">

        {/* LEFT */}
        <div className="w-full xl:flex-1 xl:sticky xl:top-24">

          {/* mobile slider */}
          <div className="xl:hidden overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {images.map((item, index) => (
                <div key={index} className="w-full shrink-0 relative">
                  <Image
                    src={item}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-2 h-2 rounded-full ${imageIndex === i ? "bg-red-500" : "bg-black/30"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* desktop grid */}
          <div className="hidden xl:grid grid-cols-2 gap-4">
            {images.map((item, index) => (
              <div key={index} className="relative w-full h-150">
                <Image src={item} alt="Not Available" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-112.5">

          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <Link href={`/${product.gender}/${product.subCategory}`}>
              <p className="text-sm text-gray-400 font-medium">{product.subCategory}</p>
            </Link>
          </div>

          <div className="mt-2">
            <p className="text-xl font-semibold">₹ {price}</p>
            <p className="text-xs text-gray-500">Price incl. of all taxes</p>
          </div>

          {/* variants */}
          {!product.variants.length && (
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">
                Shop by Variant / Look
              </p>

              <div className="flex gap-2">
                {product.variants.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => handleVariantChange(i)}
                    className={`relative w-16 h-21 rounded overflow-hidden border ${variantIndex === i
                        ? "border-black"
                        : "border-gray-300"
                      }`}
                  >
                    <Image src={item.mainImage} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* sizes */}
          {selectedVariant && (
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">
                Please select a size 
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedVariant.options.map((opt) => {
                  const isOut = opt.stock === 0;
                  const isLow = opt.stock > 0 && opt.stock <= 6;

                  return (
                    <div key={opt.size} className="relative">
                      <button
                        disabled={isOut}
                        onClick={() => {
                          setSize(opt.size);
                          setDanger(false);
                        }}
                        className={`relative px-5.5 font-medium py-1 text-sm lg:text-lg  rounded border-2
                                  ${size === opt.size ? "border-gray-600" : "border-gray-300"}
                                  ${isOut ? "opacity-40 cursor-not-allowed" : ""}
              `         }>
                        {opt.size}

                        {isOut && (
                          <span className="pointer-events-none absolute left-0 top-1/2 w-full h-px bg-gray-500 -rotate-25" />
                        )}
                      </button>

                      {isLow && (
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-medium text-red-500">
                          {opt.stock} Left
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {danger && !size && (
                <div className="bg-red-400 text-white font-medium px-2 py-2 mt-4">
                  Please select a size
                </div>
              )}
            </div>
          )}


          {/* quantity */}
          <div className="mt-5 flex items-center gap-3">
            <p className="text-sm font-medium">Quantity : </p>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* buttons desktop */}
          <div className="mt-5 hidden xl:flex gap-3">
            <button
              className="flex-1 bg-red-500 text-white py-2 text-sm font-semibold rounded"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            <button
              className="flex-1 border py-2 text-sm rounded"
              onClick={handleAddToWishlist}
            >
              ♡ ADD TO WISHLIST
            </button>
          </div>

          {/* delivery */}
          <div className="mt-6 border-t pt-4 text-sm">
            <p className="font-medium mb-2">Delivery Details</p>

            <div className="flex gap-2 mb-2">
              <input
                placeholder="Enter Pincode"
                className="border rounded px-3 py-2 text-sm flex-1"
              />
              <button className="font-semibold text-sm">CHECK</button>
            </div>

            <p className="text-xs text-gray-500">
              This product is eligible for return or exchange under our
              30 day return or exchange policy. No questions asked.
            </p>
          </div>

          {/* accordion */}
          <div className="mt-6 divide-y text-sm border border-gray-300  shadow-sm rounded-lg">

            <div className="py-3 px-1">
              <button
                onClick={() => setOpen(open === "pd" ? null : "pd")}
                className="flex w-full justify-between font-medium"
              >
                Product Details
                <span>{open === "pd" ? "▲" : "▼"}</span>
              </button>

              {open === "pd" && (
                <p className="mt-2 text-gray-600">
                  Regular fit. Premium cotton fabric. Easy care.
                </p>
              )}
            </div>

            <div className="py-3 px-1">
              <button
                onClick={() => setOpen(open === "desc" ? null : "desc")}
                className="flex w-full justify-between font-medium"
              >
                Product Description
                <span>{open === "desc" ? "▲" : "▼"}</span>
              </button>

              {open === "desc" && (
                <div className="mt-2 text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              )}
            </div>

            <div className="py-3 px-1">
              <button
                onClick={() => setOpen(open === "artist" ? null : "artist")}
                className="flex w-full justify-between font-medium"
              >
                Artist&apos;s Details
                <span>{open === "artist" ? "▲" : "▼"}</span>
              </button>

              {open === "artist" && (
                <div className="mt-2 text-gray-600 leading-relaxed whitespace-pre-line">
                  {artistText}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-3 flex gap-3 xl:hidden">
        <button
          className="flex-1 border py-2 text-sm font-medium rounded"
          onClick={handleAddToWishlist}
        >
          ♡ WISHLIST
        </button>

        <button
          className="flex-1 bg-red-500 text-white py-2 text-sm font-semibold rounded"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
