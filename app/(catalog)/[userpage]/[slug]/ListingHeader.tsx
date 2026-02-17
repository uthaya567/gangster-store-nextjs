"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { products } from "@/app/lib/products";
import type { Product } from "@/app/lib/products";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import SideBar from "@/app/components/Card/SideBar";
import Category from "@/app/components/FilterComponents/Category";
import FilterDrawer from "@/app/components/MenuBarComponents/FilterDrawer";
import { FiX } from "react-icons/fi";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";

type PriceRange = {
  id: number;
  min: number;
  max: number;
  label: string;
};

const PRICE_RANGES: PriceRange[] = [
  { id: 1, min: 799, max: 1414, label: "Rs. 799 - Rs. 1414" },
  { id: 2, min: 1415, max: 2030, label: "Rs. 1415 - Rs. 2030" },
  { id: 3, min: 2031, max: 2646, label: "Rs. 2031 - Rs. 2646" },
  { id: 4, min: 2647, max: 3262, label: "Rs. 2647 - Rs. 3262" },
  { id: 5, min: 3263, max: 3878, label: "Rs. 3263 - Rs. 3878" },
  { id: 6, min: 3879, max: 4499, label: "Rs. 3879 - Rs. 4499" }
];

export default function ListingHeader() {

  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const { setSection } = useSection();

  const [pageFilter, setPageFilter] = useState<string | null>(null);

  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilterBtn, setShowFilterBtn] = useState(false);

  /* --------------------------------------------------
     gender from URL
  -------------------------------------------------- */

  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    if (g?.toLowerCase() === "men" || g?.toLowerCase() === "women") {
      return g.toLowerCase();
    }
    return null;
  }, [pathname]);

  useEffect(() => {
    if (!gender) return;
    setSection(gender === "men" ? "MEN" : "WOMEN");
  }, [gender, setSection]);

  /* --------------------------------------------------
     products filtered by gender first
  -------------------------------------------------- */

  const allProducts = useMemo<Product[]>(() => {
    if (!gender) return products;
    return products.filter(p => p.gender.toLowerCase() === gender);
  }, [gender]);

  /* --------------------------------------------------
     read url filter (category OR subcategory)
  -------------------------------------------------- */

  useEffect(() => {
    if (!params?.slug) return;
    setPageFilter(decodeURIComponent(params.slug));
  }, [params]);

  const url = decodeURIComponent(params.slug ?? "")
  /* --------------------------------------------------
     detect what url value represents
  -------------------------------------------------- */

  const urlMatch = useMemo(() => {
    if (!pageFilter) return null;

    const isCategory = allProducts.some(
      p => p.category.toLowerCase() === pageFilter.toLowerCase()
    );

    const isSubCategory = allProducts.some(
      p => p.subCategory?.toLowerCase() === pageFilter.toLowerCase()
    );

    return {
      value: pageFilter,
      isCategory,
      isSubCategory
    };
  }, [pageFilter, allProducts]);

  /* --------------------------------------------------
     base products
     (gender + category OR subcategory)
  -------------------------------------------------- */
  const baseProducts = useMemo<Product[]>(() => {

    if (!urlMatch) return allProducts;

    // URL is main category
    if (urlMatch.isCategory) {
      return allProducts.filter(
        p => p.category.toLowerCase() === urlMatch.value.toLowerCase()
      );
    }

    // URL is sub category
    if (urlMatch.isSubCategory) {

      const matchedProduct = allProducts.find(
        p => p.subCategory?.toLowerCase() === urlMatch.value.toLowerCase()
      );

      if (!matchedProduct) return allProducts;

      const mainCategory = matchedProduct.category;

      // 👉 return ALL products of that main category
      return allProducts.filter(
        p => p.category.toLowerCase() === mainCategory.toLowerCase()
      );
    }

    return allProducts;

  }, [allProducts, urlMatch]);


  /* --------------------------------------------------
     auto select subcategory if url is subcategory
  -------------------------------------------------- */

  useEffect(() => {
    if (!urlMatch?.isSubCategory) return;

    setSelectedSubCategories([urlMatch.value]);

  }, [urlMatch]);

  /* --------------------------------------------------
     sub categories
  -------------------------------------------------- */

  const allSubCategories = useMemo<string[]>(() => {

    const set = new Set<string>();

    baseProducts.forEach(p => {
      if (p.subCategory) set.add(p.subCategory);
    });

    return Array.from(set);

  }, [baseProducts]);

  /* --------------------------------------------------
     size base products
  -------------------------------------------------- */

  const sizeBaseProducts = useMemo<Product[]>(() => {

    if (selectedSubCategories.length === 0) return baseProducts;

    return baseProducts.filter(p =>
      selectedSubCategories.includes(p.subCategory ?? "")
    );

  }, [baseProducts, selectedSubCategories]);

  const allSizes = useMemo<string[]>(() => {

    const set = new Set<string>();

    sizeBaseProducts.forEach(p => {
      p.variants.forEach(v => {
        v.options.forEach(o => {
          if (o.stock > 0) set.add(o.size);
        });
      });
    });

    return Array.from(set);

  }, [sizeBaseProducts]);

  /* --------------------------------------------------
     sub category counts
  -------------------------------------------------- */

  const subCategoryCounts = useMemo<Record<string, number>>(() => {

    const map: Record<string, number> = {};

    baseProducts.forEach(p => {
      if (!p.subCategory) return;
      map[p.subCategory] = (map[p.subCategory] || 0) + 1;
    });

    return map;

  }, [baseProducts]);

  /* --------------------------------------------------
     size counts
  -------------------------------------------------- */

  const sizeCounts = useMemo<Record<string, number>>(() => {

    const map: Record<string, number> = {};

    sizeBaseProducts.forEach(p => {
      p.variants.forEach(v => {
        v.options.forEach(o => {
          if (o.stock > 0) {
            map[o.size] = (map[o.size] || 0) + 1;
          }
        });
      });
    });

    return map;

  }, [sizeBaseProducts]);

  /* --------------------------------------------------
     price counts
  -------------------------------------------------- */

  const priceCounts = useMemo<Record<number, number>>(() => {

    const map: Record<number, number> = {};
    PRICE_RANGES.forEach(r => (map[r.id] = 0));

    sizeBaseProducts.forEach(p => {
      p.variants.forEach(v => {
        PRICE_RANGES.forEach(r => {
          if (v.price >= r.min && v.price <= r.max) {
            map[r.id] += 1;
          }
        });
      });
    });

    return map;

  }, [sizeBaseProducts]);

  /* --------------------------------------------------
     final filtered products
  -------------------------------------------------- */

  const filteredProducts = useMemo<Product[]>(() => {

    return baseProducts.filter(p => {

      if (
        selectedSubCategories.length > 0 &&
        !selectedSubCategories.includes(p.subCategory ?? "")
      ) {
        return false;
      }

      const variantPass = p.variants.some(v => {

        if (selectedPrice) {
          if (v.price < selectedPrice.min || v.price > selectedPrice.max) {
            return false;
          }
        }

        if (selectedSizes.length > 0) {

          const ok = v.options.some(o =>
            selectedSizes.includes(o.size) && o.stock > 0
          );

          if (!ok) return false;
        }

        return true;
      });

      return variantPass;

    });

  }, [
    baseProducts,
    selectedSubCategories,
    selectedSizes,
    selectedPrice
  ]);

  /* --------------------------------------------------
     filter button animation
  -------------------------------------------------- */

  useEffect(() => {
    const t = setTimeout(() => setShowFilterBtn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */

  return (
    <div>

      <div className="lg:flex hidden shadow-sm">
        <div className="relative w-full rounded-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-4 px-6 py-5 lg:pl-80 md:pl-60">
            <div className="space-y-2 text-gray-700">
              <p className="text-xs text-gray-600">
                <Link href={`/`}>Home</Link> /{" "}
                <Link href={`${params.slug}`}>{url}</Link>
              </p>

              <p className="text-lg text-gray-600 font-semibold">
                {/* {selectedSubCategories.length > 0?url?.toUpperCase():"ALL"}{" "} */}
                {`${url} - `}
                <span className="text-sm font-normal">
                  {/* - {selectedSubCategories.length > 0?selectedSubCategories.length:allSubCategories.length} */}
                  {allSubCategories.length}
                </span>
              </p>

              <div className="flex flex-wrap gap-2 mt-2">

                {selectedSubCategories.map(item => (
                  <div
                    key={item}
                    className="flex items-center gap-2 border px-2 py-1 rounded"
                  >
                    <p className="text-sm">{item}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubCategories(prev =>
                          prev.filter(c => c !== item)
                        )
                      }
                    >
                      <FiX />
                    </button>
                  </div>
                ))}

                {selectedSizes.map(size => (
                  <div
                    key={size}
                    className="flex items-center gap-2 border px-2 py-1 rounded"
                  >
                    <p className="text-sm">{size}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSizes(prev =>
                          prev.filter(s => s !== size)
                        )
                      }
                    >
                      <FiX />
                    </button>
                  </div>
                ))}

                {selectedPrice && (
                  <div className="flex items-center gap-2 border px-2 py-1 rounded">
                    <p className="text-sm">{selectedPrice.label}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedPrice(null)}
                    >
                      <FiX />
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-2 lg:flex">

        <div className="lg:flex hidden ">
          <aside className="lg:w-70  min-h-screen border-r border-gray-400 h-[85vh] overflow-y-auto xl:flex-1 xl:sticky xl:top-24">

            <h3 className="font-semibold mb-3 mt-2 px-2">CATEGORIES</h3>

            <div className="space-y-2">
              {allSubCategories.map(cat => (
                <label
                  key={cat}
                  className="flex items-center justify-between text-sm cursor-pointer lg:px-3"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubCategories.includes(cat)}
                      onChange={() =>
                        setSelectedSubCategories(prev =>
                          prev.includes(cat)
                            ? prev.filter(c => c !== cat)
                            : [...prev, cat]
                        )
                      }
                    />
                    <span>{cat}</span>
                  </div>
                  <span className="text-gray-500">
                    {subCategoryCounts[cat] ?? 0}
                  </span>
                </label>
              ))}
            </div>

            <hr className="my-5 border-0.5 border-gray-400" />

            <h3 className="font-semibold mb-3 px-2">SIZE</h3>

            <div className="flex flex-wrap gap-2 px-2">
              {allSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSizes(prev =>
                      prev.includes(size)
                        ? prev.filter(s => s !== size)
                        : [...prev, size]
                    )
                  }
                  className={`border rounded-md px-3 py-1 text-sm
                    ${selectedSizes.includes(size)
                      ? "border-black font-medium"
                      : "border-gray-400"
                    }`}
                >
                  {size}
                  <span className="text-gray-500 ml-1">
                    ({sizeCounts[size] ?? 0})
                  </span>
                </button>
              ))}
            </div>

            <hr className="my-5 border-0.5 border-gray-400" />

            <h3 className="font-semibold mb-3 px-2">PRICES</h3>

            <div className="space-y-3 px-2">
              {PRICE_RANGES.map(p => (
                <label
                  key={p.id}
                  className="flex items-center justify-between text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice?.id === p.id}
                      onChange={() => setSelectedPrice(p)}
                    />
                    <span>{p.label}</span>
                  </div>
                  <span className="text-gray-500">
                    {priceCounts[p.id] ?? 0}
                  </span>
                </label>
              ))}
            </div>

          </aside>
        </div>
        {/* for mobile filter cancel */}
        <div
          className="flex gap-2 mt-2 lg:hidden px-2 py-2
             overflow-x-auto overflow-y-hidden
             flex-nowrap
             touch-pan-x"
        >
          {selectedSubCategories.map(item => (
            <div
              key={item}
              className="flex shrink-0 items-center gap-1 border px-1 rounded"
            >
              <p className="text-[10px]">{item}</p>
              <button
                type="button"
                onClick={() =>
                  setSelectedSubCategories(prev =>
                    prev.filter(c => c !== item)
                  )
                }
                className="text-[14px]"
              >
                <FiX />
              </button>
            </div>
          ))}

          {selectedSizes.map(size => (
            <div
              key={size}
              className="flex shrink-0 items-center gap-2 border px-1 py-0.5 rounded"
            >
              <p className="text-[12px]">{size}</p>
              <button
                type="button"
                onClick={() =>
                  setSelectedSizes(prev =>
                    prev.filter(s => s !== size)
                  )
                }
              >
                <FiX />
              </button>
            </div>
          ))}
          
          {selectedPrice && (
            <div className="flex shrink-0 items-center gap-2 border px-2 py-1 rounded">
              <p className="text-sm">{selectedPrice.label}</p>
              <button
                type="button"
                onClick={() => setSelectedPrice(null)}
              >
                <FiX />
              </button>
            </div>
          )}
        </div>

        <div className="lg:py-4 px-2 py-2 min-h-screen">
          <SideBar filteredProducts={filteredProducts} />
        </div>

        <FilterDrawer open={menuOpen} onClose={closeMenu} position="left">
          <Category
            allSubCategories={allSubCategories}
            selectedSubCategories={selectedSubCategories}
            setSelectedSubCategories={setSelectedSubCategories}
            subCategoryCounts={subCategoryCounts}
            allSizes={allSizes}
            setSelectedSizes={setSelectedSizes}
            selectedSizes={selectedSizes}
            sizeCounts={sizeCounts}
            PRICE_RANGES={PRICE_RANGES}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            priceCounts={priceCounts}
          />
        </FilterDrawer>

      </div>

      <button
        type="button"
        onClick={openMenu}
        className={`
          fixed bottom-5 left-1/2 -translate-x-1/2
          z-50
          rounded-full
          text-white
          bg-linear-to-r from-red-400 via-red-500 to-red-600
          hover:bg-linear-to-br
          focus:ring-4 focus:outline-none focus:ring-red-300
          shadow-lg shadow-red-500/50
          font-medium
          text-sm
          px-4 py-2.5
          transition-all duration-500 ease-out
          lg:hidden md:hidden
          ${showFilterBtn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"}
        `}
      >
        Filter
      </button>

    </div>
  );
}
