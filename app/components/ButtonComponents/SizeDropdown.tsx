"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
type Props = {
  value: string;
  onChange: (newsize: string) => void;
};

export default function SizeDropdown({value , onChange}:Props) {
  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(value);

  return (
    <div className="relative w-15 lg:w-22 md:20">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border rounded-lg px-1 py-1 lg:px-2 bg-white text-[10px] lg:text-sm md:text-sm font-medium"
      >
        <span className="">
          Size: <span className="font-semibold">{size}</span>
        </span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute left-0 top-full z-10 w-full border rounded-md bg-white mt-1 shadow">
          {sizes.map((s) => (
            <li
              key={s}
              onClick={() => {
                setSize(s);
                onChange(s)
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                s === size ? "font-semibold bg-gray-50" : ""
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
