"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/lib/products";
import { usePathname } from "next/navigation";

export default function Type3Carousel() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Touch states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toUpperCase() : null;
  }, [pathname]);

  const cards = useMemo(() => {
    if (!gender) return [];

    const map = new Map<string, (typeof products)[number]>();

    products.forEach((p) => {
      if (p.gender === gender && !map.has(p.category)) {
        map.set(p.category, p);
      }
    });

    return Array.from(map.values());
  }, [gender]);

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) setCardsPerView(2);
      else if (w < 1024) setCardsPerView(3);
      else setCardsPerView(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setCurrent(0);
  }, [cardsPerView, cards.length]);

  const pages = useMemo(() => {
    const res: typeof cards[] = [];
    for (let i = 0; i < cards.length; i += cardsPerView) {
      res.push(cards.slice(i, i + cardsPerView));
    }
    return res;
  }, [cards, cardsPerView]);

  const maxIndex = pages.length - 1;

  const next = useCallback(() => {
    setCurrent((p) => (p === maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((p) => (p === 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  // Swipe Logic
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

  if (!cards.length) return null;

  return (
    <div className="relative w-full px-2 lg:px-4 py-10">
      <div className="uppercase flex justify-center font-bold text-2xl text-gray-700 mt-5 mb-10">
        Collections
      </div>

      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pages.map((group, i) => (
            <div key={i} className="min-w-full shrink-0">
              <div className="flex">
                {group.map((card) => (
                  <div
                    key={card.id}
                    className="shrink-0 px-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 w-full">
                      <Link
                        href={`/${gender?.toLowerCase()}/${card.category}`}
                      >
                        <Image
                          src={card.variants[0].mainImage}
                          alt={card.category}
                          width={500}
                          height={600}
                          className="w-full h-60 md:h-87.5 lg:h-110 object-cover"
                        />
                      </Link>

                      <div className="p-3 text-center font-medium">
                        {card.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Arrows */}
      <button
        onClick={prev}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <MdArrowBackIos />
      </button>

      <button
        onClick={next}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <MdArrowForwardIos />
      </button>

      {/* Mobile Dots */}
      <div className="flex justify-center gap-3 mt-5 lg:hidden">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i
                ? "bg-red-500 scale-110"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
