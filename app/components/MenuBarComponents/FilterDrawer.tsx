"use client";
import { FiX } from "react-icons/fi";

type FilterDarwer ={
  open : Boolean,
  onClose: () => void,
  position : "left" | "right"
  children: React.ReactNode;
}
export default function FilterDrawer({
  open,
  onClose,
  position,
  children,
}:FilterDarwer) {
  const side =
    position === "right"
      ? open
        ? "translate-x-0"
        : "translate-x-full"
      : open
      ? "translate-x-0"
      : "-translate-x-full";

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 ${
          position === "right" ? "right-0" : "left-0"
        } h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${side}`}
      >
        <div className="flex justify-end"><button onClick={onClose} className="relative right-3 top-5"><FiX/></button></div>
        {/* Content */}
        <div className="p-4">
          {children}
          </div>
      </aside>
    </>
  );
}
