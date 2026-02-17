"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  value: number;
  onChange: (newQty: number) => void;
};

export default function OtyButton({ value, onChange }: Props) {
  const list = [1,2,3,4,5,6,7,8,9,10];
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-15 lg:w-22 md:20">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border rounded-lg px-1 py-1 lg:px-2 bg-white text-[10px] lg:text-sm md:text-sm font-medium"
      >
        <span>
          Qty: <span className="font-semibold">{value}</span>
        </span>
        <FiChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-10 w-full border rounded-md bg-white mt-1 shadow">
          {list.map((n) => (
            <li
              key={n}
              onClick={() => {
                onChange(n);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                n === value ? "font-semibold bg-gray-50" : ""
              }`}
            >
              {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
