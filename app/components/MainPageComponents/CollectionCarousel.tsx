"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { usePathname } from "next/navigation";

import test1 from "../../assets/subBanner/subBanner1.jpg";
import test2 from "../../assets/subBanner/subBanner2.jpg";
import Layer1 from "../../assets/subBanner/subBanner2Layer1.jpg";
import Layer2 from "../../assets/subBanner/subBanner2Layer2.jpg";

const slide1 = [
  { id: 1, image: test2, gender: "MEN" },
  { id: 2, image: test1, gender: "WOMEN" },
];

const slide2 = [
  { id: 1, image: Layer1, gender: "MEN" },
  { id: 2, image: Layer2, gender: "WOMEN" },
];

export default function Collections() {
  const pathname = usePathname();

  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  //   gender
  const gender = useMemo(() => {
    const g = pathname.split("/")[1];
    return g ? g.toUpperCase() : null;
  }, [pathname]);

  //   listen screen size
  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  //   filter once
  const filteredSlide1 = useMemo(() => {
    if (!gender) return slide1;
    return slide1.filter((s) => s.gender === gender);
  }, [gender]);

  const filteredSlide2 = useMemo(() => {
    if (!gender) return slide2;
    return slide2.filter((s) => s.gender === gender);
  }, [gender]);

  //   select slides from state instead of storing in state
  const slides = useMemo(() => {
    return isDesktop ? filteredSlide1 : filteredSlide2;
  }, [isDesktop, filteredSlide1, filteredSlide2]);

  //   reset index only when slides really change
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;

    setCurrent((p) => (p + 1 >= slides.length ? 0 : p + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return;

    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <>
    <div className=" uppercase text-2xl font-bold flex justify-center mt-5 mb-5 text-gray-900">
      NEW IN 
      <span className="text-3xl relative bottom-1 px-1">:</span> 
      Collections
      </div>
    <div className="lg:px-4 px-2">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 relative"
            >
              <Image
                src={slide.image}
                alt="carousel"
                priority={current === 0}
                className="w-full lg:h-112.5 md:h-87.5 sm:h-60 h-60 object-cover"
              />
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-5 -translate-y-1/2 text-white p-3 z-20"
          >
            <MdArrowBackIos size={22} />
          </button>
        )}

        {slides.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-5 -translate-y-1/2 text-white p-3 z-20"
          >
            <MdArrowForwardIos size={22} />
          </button>
        )}
      </div>
    </div>
    </>
  );
}
