"use client";

import { useMemo, useState, useEffect } from "react";
import { products } from "../../lib/products";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
type Props = {
  onClose: () => void;
};

function useDebounce<T>(value: T, delay = 150) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function MenuSearchBar({ onClose }: Props) {
  const pathname = usePathname();

  const gender = pathname.split("/")[1]?.toLowerCase();

  const baseProducts = useMemo(() => {
    if (gender !== "men" && gender !== "women") return products;

    return products.filter(
      (p) => p.gender.toLowerCase() === gender
    );
  }, [gender]);

  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 150);

  function fuzzyMatch(text: string, input: string) {
    text = text.toLowerCase();
    input = input.toLowerCase();

    let t = 0;
    let matchCount = 0;

    for (let q = 0; q < input.length; q++) {
      while (t < text.length) {
        if (text[t] === input[q]) {
          matchCount++;
          t++;
          break;
        }
        t++;
      }
    }

    if (input.length === 0) return true;

    return matchCount / input.length >= 0.6;
  }

  const results = useMemo(() => {
    if (!debouncedInput.trim()) return [];

    const list = baseProducts
      .map((product) => {
        const match = product.variants.find((v) =>
          fuzzyMatch(v.Product_name, debouncedInput)
        );

        if (!match) return null;

        return {
          id: product.id,
          Product_name: match.Product_name,
        };
      })
      .filter(Boolean)
      .slice(0, 8); // limit results for performance

    return list as { id: number; Product_name: string }[];
  }, [debouncedInput, baseProducts]);
  return (
    <div className="px-2 py-2 mt-6">
      <div className="flex">
        <div className="flex w-full border-b-2 mb-4 pb-1">
          <div className="relative top-2">
            <IoIosSearch size={24}/>
          </div>
          <input
            type="text"
            placeholder="Search for products"
            value={input}
            className="w-full px-2 border-gray-300 focus:outline-none focus:border-black py-2 text-lg"
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
        <div className="relative top-2">
          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>
      </div>

      <ul className="pt-2 text-gray-600 space-y-1">
        {results.map((item) => (
          <li
            key={item.id}
            className="text-lg font-semibold py-1 hover:text-gray-400"
          >
            <Link
              href={`/product/${item.Product_name}`}
              onClick={onClose}
              className="block w-full"
            >
              {item.Product_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
