"use client";

import Image from "next/image";
import img1 from "../../assets/curated/curated1.jpg";
import img2 from "../../assets/curated/curated2.jpg";
import img3 from "../../assets/curated/curated3.jpg";
import img4 from "../../assets/curated/curated4.jpg";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const products = [
  { id: 1, image: img1, Product_name: "Plaid Shirt", price: "₹1299", gender: "Men" },
  { id: 2, image: img2, Product_name: "Oversized Tee", price: "₹899", gender: "Men" },
  { id: 3, image: img3, Product_name: "Cropped Shirt", price: "₹1199", gender: "Men" },
  { id: 4, image: img4, Product_name: "Cropped Shirt", price: "₹1199", gender: "Women" },
];

export default function Curated() {
  const pathname = usePathname();

  // ✅ memoize gender once
  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toLowerCase() : null;
  }, [pathname]);

  // ✅ optimized filtering
  const filteredSlides = useMemo(() => {
    if (!gender) return products;

    return products.filter(
      (p) => p.gender.toLowerCase() === gender
    );
  }, [gender]);

  return (
    <div className="p-2">
      <div className="flex justify-center text-2xl text-gray-900 uppercase font-bold pb-10">
        curated for you
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 lg:gap-3 gap-2 px-2 py-2">
        {filteredSlides.map((item) => (
          <div
            key={item.id}
            className="sm:h-50 lg:h-87.5 md:h-60 h-50 overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.Product_name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
