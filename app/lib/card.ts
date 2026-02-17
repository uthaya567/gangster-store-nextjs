export type CartItem = {
  productId: number;
  gender : string;
  Product_name: string;
  variantId: string;
  variantName: string;
  price: number;
  size: string;
  qty: number;
  image: any;
  subCategory : string;
};

export function addToCart(item: CartItem) {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  ) as CartItem[];

  const existing = cart.find(
    (c) =>
      c.productId === item.productId &&
      c.variantId === item.variantId &&
      c.size === item.size
  );

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}


export function addToWishlist(item: CartItem) {
  const wishlist = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  ) as CartItem[];

  const existingIndex = wishlist.findIndex(
    (c) =>
      c.productId === item.productId &&
      c.variantId === item.variantId
  );

  if (existingIndex !== -1) {
    // 🔥 Update size instead of creating new item
    wishlist[existingIndex].size = item.size;
  } else {
    wishlist.push(item);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // optional event update
  window.dispatchEvent(new Event("wishlistUpdated"));
}

