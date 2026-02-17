"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import Drawer from "../MenuBarComponents/Drawer";
import MenuMenubar from "../MenuBarComponents/MenuMenubar";
import MenuSearchBar from "../MenuBarComponents/MenuSearchBar";
import { usePathname, useSearchParams } from "next/navigation";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";
import { useAuth } from "@/app/components/Custom/Hook/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cardcount, setCardcount] = useState(0);
  const [wishlist, setWishlistcount] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { section } = useSection();

  const { isLoggedIn } = useAuth();

  const isAuthPage =
    pathname.toLowerCase() === "/login" ||
    pathname.toLowerCase() === "/register";

  const redirectTarget = isAuthPage
    ? searchParams.get("redirect") || "/"
    : searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

  const loginLink = redirectTarget
    ? `/login?redirect=${encodeURIComponent(redirectTarget)}`
    : "/login";

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const menuLinks = [
    { label: "MEN", href: "/men" },
    { label: "WOMEN", href: "/women" },
    { label: "ABOUT", href: "/about" },
  ];

  const iconButtons = [
    { icon: <FiSearch />, onClick: openSearch },

    {
      icon: <FiUser />,
      link: isLoggedIn ? "/profile" : loginLink,
      match: isLoggedIn ? ["/profile"] : ["/login", "/register"],
    },

    {
      icon: <FiHeart />,
      link: "/wishlist",
      match: ["/wishlist"],
      count: wishlist,
    },

    {
      icon: <FiShoppingBag />,
      link: "/mycart",
      match: ["/mycart"],
      count: cardcount,
    },
  ];

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    setCardcount(cart.length);
    setWishlistcount(wishlist.length);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("wishlistUpdated", updateCount);
    };
  }, []);

  return (
    <>
      <header className="w-full shadow-lg fixed top-0 z-50 bg-white">
        <div className="text-center text-[10px] py-2 border-b">
          SUMMER STAPLES FOR THE COMING SEASON
        </div>

        <nav className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="text-2xl font-bold text-red-600">
            <Link href="/">Gangster</Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-6 font-medium">
            {menuLinks.map((item) => {
              const isActive =
                pathname.toLowerCase().startsWith(item.href) ||
                section?.toLowerCase() === item.label.toLowerCase();

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeSearch}
                  className={`relative
                    after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:bg-red-600
                    after:transition-all after:duration-300
                    ${isActive
                      ? "after:w-full text-red-600"
                      : "after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Icons */}
          <div className="relative flex items-center gap-1 lg:gap-3 md:gap-3 text-xl">
            {iconButtons.map((btn, index) => {
              const active = btn.match?.includes(
                pathname.toLowerCase()
              );

              return (
                <div
                  key={index}
                  className={`px-2 relative
                    after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:bg-red-600
                    after:transition-all after:duration-300
                    ${active
                      ? "after:w-full text-red-600"
                      : "after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {btn.link ? (
                    <Link href={btn.link}>
                      {btn.icon}
                    </Link>
                  ) : (
                    <button onClick={btn.onClick}>
                      {btn.icon}
                    </button>
                  )}

                  {(btn.count ?? 0) > 0 && (
                    <span
                      className="absolute -top-2 -right-1 flex items-center 
                      justify-center h-4 min-w-4 px-0.5 rounded-full bg-red-500 
                      text-[8px] font-bold text-white"
                    >
                      {btn.count}
                    </span>
                  )}
                </div>
              );
            })}

            <button className="md:hidden" onClick={openMenu}>
              <FiMenu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Drawers */}
      <div className="lg:hidden flex md:hidden">
        <Drawer
          open={menuOpen}
          onClose={closeMenu}
          title="MENU"
          position="right"
        >
          <MenuMenubar onClose={closeMenu} />
        </Drawer>
      </div>

      <Drawer
        open={searchOpen}
        onClose={closeSearch}
        title="SEARCH"
        position="right"
      >
        <MenuSearchBar onClose={closeSearch} />
      </Drawer>
    </>
  );
}
