"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { products } from "../../lib/products";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewArrivals() {
  const pathname = usePathname();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  // Touch states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toUpperCase() : null;
  }, [pathname]);

  const items = useMemo(() => {
    if (!gender) return products;
    return products.filter((p) => p.gender === gender);
  }, [gender]);

  const product = useMemo(() => items.slice(0, 8), [items]);

  // Responsive page size
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      const next =
        w >= 1024 ? 4 :
        w >= 768 ? 3 :
        2;

      setPageSize((p) => (p === next ? p : next));
      setPage(0);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = useMemo(() => {
    const res: typeof product[] = [];

    for (let i = 0; i < product.length; i += pageSize) {
      res.push(product.slice(i, i + pageSize));
    }

    return res;
  }, [product, pageSize]);

  const totalPages = pages.length;

  const next = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }, [totalPages]);

  // Swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }
  };

  if (!product.length) return null;

  return (
    <div>
      <div className="uppercase text-2xl font-bold flex justify-center mt-15 mb-7 text-gray-900">
        New Arrivals
      </div>

      <div className="relative px-2">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((group, pageIndex) => (
              <div key={pageIndex} className="min-w-full">
                <div className="flex">
                  {group.map((item) => {
                    const v = item.variants?.[0];
                    if (!v) return null;

                    return (
                      <div
                        key={item.id}
                        className="shrink-0 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 px-1"
                      >
                        <div className="border border-gray-300">
                          <Link
                            href={`/product/${encodeURIComponent(v.Product_name)}`}
                          >
                            <Image
                              src={v.mainImage}
                              alt={v.Product_name}
                              height={500}
                              className="w-full md:h-87.5 lg:h-120 h-60 object-cover"
                            />
                          </Link>
                          <div className="mt-2 text-sm px-2">
                            <p className="font-medium truncate">
                              {v.Product_name}
                            </p>
                            <p className="text-gray-400">
                              {item.subCategory}
                            </p>
                            <p className="text-gray-500">
                              ₹ {v.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Arrows Only */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black/20 p-2 shadow rounded-full"
            >
              <MdArrowBackIos size={18} />
            </button>

            <button
              onClick={next}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black/20 p-2 shadow rounded-full"
            >
              <MdArrowForwardIos size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
