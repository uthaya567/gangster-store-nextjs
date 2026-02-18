"use client";

import ProductCard from "./ProductCard";
import { products } from "../../lib/products";
import { usePathname } from "next/navigation";
import { useMemo, useEffect } from "react";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";

export default function CardsGrid() {
  const pathname = usePathname();
  const { setSection } = useSection();

  //   memoized gender from route
  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toLowerCase() : null;
  }, [pathname]);

  //   memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!gender) return products;

    return products.filter(
      (p) => p.gender.toLowerCase() === gender
    );
  }, [gender]);

  //   update section only when gender changes
  useEffect(() => {
    if (!gender) return;

    if (gender === "men") {
      setSection("MEN");
    } else if (gender === "women") {
      setSection("WOMEN");
    }
  }, [gender, setSection]);

  return (
    <div className="pb-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-5 gap-3 px-2 py-4 text-[8px] lg:text-[13px] md:text-[12px]">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} gender={gender}/>
        ))}
      </div>
    </div>
  );
}
