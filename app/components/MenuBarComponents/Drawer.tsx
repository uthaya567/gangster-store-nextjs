"use client";
import { FiX } from "react-icons/fi";

type DrawerData ={
  open : Boolean,
  onClose: () => void,
  title : string,
  position : "left" | "right"
  children: React.ReactNode;
}
export default function Drawer({
  open,
  onClose,
  title,
  position,
  children,
}:DrawerData) {
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
          className="fixed inset-0 bg-black/60 z-40 "
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 ${
          position === "right" ? "right-0" : "left-0"
        } h-full  ${title == "SEARCH" ?"border border-gray-300 shadow-2xl " :  ""}lg:w-120 md:w-100 w-full  bg-white z-50 transform transition-transform duration-300 ease-in-out ${side}`}
      >
        {/* ${title == "MENU" ?" w-full " :  "w-72"}  */}
        {/* Header */}
        {/* <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-semibold">{title}</span>
          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div> */}


        {/* Content */}
        <div>{children}</div>
      </aside>
    </>
  );
}
