"use client"

import { usePathname } from "next/navigation";
import { useSection } from "../Custom/Hook/SectionContext";
import Link from "next/link";
import { FiX } from "react-icons/fi";
type Props = {
  onClose: () => void;
};

export default function MenuMenubar({ onClose }: Props)  {
    const menuLinks = [
    { label: "MEN", href: "/men" },
    { label: "WOMEN", href: "/women" },
    { label: "ABOUT", href: "/about" },
  ];
    const pathname = usePathname();
    const { section } = useSection();
  
  return (
      <>
        <div className="flex items-center justify-end relative top-5 right-3">
            <button onClick={onClose}>
              <FiX size={22} />
            </button>
        </div>
            <div className="space-y-6 mt-7 relative">
        {/* Categories */}
        <div className="flex justify-evenly px-4 py-2 gap-6 font-medium border-b pb-3">
              {menuLinks.map((item,index) => {
                const isActive =
                  pathname.toLowerCase() === item.href.toLowerCase() &&
                  section?.toLowerCase() === item.label.toLowerCase() ||
                  section?.toLowerCase() === item.label.toLowerCase() ||
                  pathname.toLowerCase() === item.href.toLowerCase()
                  return(
                    <div
                    key={index}
                    className={`relative cursor-pointer
                      after:absolute after:left-0 after:-bottom-1
                      after:h-0.5 after:bg-red-600
                      after:transition-all after:duration-300
                      ${isActive
                        ? "after:w-full text-red-600"
                        : "after:w-0 hover:after:w-full"
                      }
                    `}
            >
              <Link href={item.href}>{item.label}</Link>
            </div>
                  )
          })}
        </div>
        <ul className="space-y-2 px-4">
          <li>NEW IN</li>
          <li>DENIM EDIT</li>
          <li>PRINTED TEES: FROM ₹799</li>
          <li>VALENTINE’S DROP</li>
        </ul>
        
            </div>
      </>
  );
}
