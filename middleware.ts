// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = ["/checkout", "/profile", "/mycart", "/wishlist"];
// const authPages = ["/login", "/register"];

// export function middleware(req: NextRequest) {
//   const { pathname, searchParams } = req.nextUrl;

//   const isLoggedIn = req.cookies.get("auth")?.value === "1";

//   const isProtected = protectedRoutes.some((r) =>
//     pathname.startsWith(r)
//   );

//   const isAuthPage = authPages.some((r) =>
//     pathname.startsWith(r)
//   );

//   // not logged in → protected
//   if (!isLoggedIn && isProtected) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/login";
//     url.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(url);
//   }

//   // logged in → auth pages
//   if (isLoggedIn && isAuthPage) {
//     const redirect = searchParams.get("redirect");

//     const url = req.nextUrl.clone();
//     url.pathname =
//       redirect && redirect.startsWith("/") ? redirect : "/";
//     url.search = "";

//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/mycart/:path*",
//     "/wishlist/:path*",
//     "/checkout/:path*",
//     "/profile/:path*",
//     "/login",
//     "/register",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoggedIn = req.cookies.get("auth")?.value === "1";

  //   ONLY checkout is protected
  if (!isLoggedIn && pathname.startsWith("/checkout")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", "/checkout");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*"],
};

