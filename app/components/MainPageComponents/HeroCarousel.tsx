"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { slides } from "@/app/lib/banner";
import { usePathname } from "next/navigation";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const pathname = usePathname();

  // ✅ memoized gender
  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toLowerCase() : null;
  }, [pathname]);

  // ✅ filter from original slides only
  const filteredSlides = useMemo(() => {
    if (!gender) return slides;

    return slides.filter(
      (s) => s.gender.toLowerCase() === gender
    );
  }, [gender]);

  // ✅ reset index when filter changes
  useEffect(() => {
    setCurrent(0);
  }, [filteredSlides]);

  // ✅ auto slide
  useEffect(() => {
    if (filteredSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev + 1 >= filteredSlides.length ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [filteredSlides.length]);

  const nextSlide = useCallback(() => {
    if (!filteredSlides.length) return;

    setCurrent((prev) =>
      prev + 1 >= filteredSlides.length ? 0 : prev + 1
    );
  }, [filteredSlides.length]);

  const prevSlide = useCallback(() => {
    if (!filteredSlides.length) return;

    setCurrent((prev) =>
      prev === 0 ? filteredSlides.length - 1 : prev - 1
    );
  }, [filteredSlides.length]);

  if (!filteredSlides.length) return null;
console.log("ll");

  return (
    <div className="lg:px-5 px-2">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {filteredSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 relative"
            >
              <Image
                src={slide.image}
                alt="carousel Not Available"
                priority={current === 0}
                className="w-full lg:h-125 md:h-87.5 sm:h-60 h-50 object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 -translate-y-1/2 text-white p-3 z-20"
        >
          <MdArrowBackIos size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 -translate-y-1/2 text-white p-3 z-20"
        >
          <MdArrowForwardIos size={22} />
        </button>
      </div>

      <div className="flex justify-center mt-5 gap-3">
        {filteredSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-transform ${
              current === index
                ? "bg-red-500 scale-110"
                : "bg-black/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
