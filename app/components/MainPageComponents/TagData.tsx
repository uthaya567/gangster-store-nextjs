"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "@/app/lib/products";
import ProductCard from "../Card/ProductCard";
import { usePathname } from "next/navigation";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";

export default function TagData() {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");

  const pathname = usePathname();
  const { setSection } = useSection();

  //  Get gender from route
  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toLowerCase() : null;
  }, [pathname]);

  //  Filter by gender first
  const genderFilteredProducts = useMemo(() => {
    if (!gender) return products;

    return products.filter(
      (p) => p.gender.toLowerCase() === gender
    );
  }, [gender]);

  //  Unique subcategories based on gender
  const uniqueSubCategories = useMemo(() => {
    return [
      "All",
      ...new Set(genderFilteredProducts.map((p) => p.subCategory)),
    ];
  }, [genderFilteredProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedSubCategory === "All") return genderFilteredProducts;

    return genderFilteredProducts.filter(
      (p) => p.subCategory === selectedSubCategory
    );
  }, [selectedSubCategory, genderFilteredProducts]);

  useEffect(() => {
    if (!gender) return;

    setSelectedSubCategory("All"); 

    if (gender === "men") setSection("MEN");
    else if (gender === "women") setSection("WOMEN");
  }, [gender, setSection]);

  return (
    <div>
      <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="w-full overflow-x-auto scrollbar-hide py-3">
          <ul className="flex gap-3 whitespace-nowrap px-4 lg:px-8">
            {uniqueSubCategories.map((tag) => (
              <li
                key={tag}
                onClick={() => setSelectedSubCategory(tag)}
                className={`px-4 py-1 border rounded-2xl text-xs lg:text-sm font-medium cursor-pointer transition
                  ${
                    selectedSubCategory === tag
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-black hover:text-white"
                  }
                `}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 px-3 py-2">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            gender={gender}
          />
        ))}
      </div>
    </div>
  );
}
