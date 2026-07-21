"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "./products";

export interface CartItem {
  productId: string;
  qty: number;
  metal: string;
}

interface ShopContextValue {
  cart: CartItem[];
  addToCart: (productId: string, qty?: number, metal?: string) => void;
  updateQty: (productId: string, metal: string, qty: number) => void;
  removeFromCart: (productId: string, metal: string) => void;
  cartCount: number;
  subtotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  quickViewId: string | null;
  setQuickViewId: (id: string | null) => void;
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const addToCart = (productId: string, qty = 1, metal = "Yellow Gold") => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.metal === metal,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.metal === metal
            ? { ...i, qty: i.qty + qty }
            : i,
        );
      }
      return [...prev, { productId, qty, metal }];
    });
    setCartOpen(true);
  };

  const updateQty = (productId: string, metal: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId, metal);
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.metal === metal ? { ...i, qty } : i,
      ),
    );
  };

  const removeFromCart = (productId: string, metal: string) =>
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.metal === metal)),
    );

  const toggleWishlist = (id: string) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );

  const toggleCompare = (id: string) =>
    setCompare((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : prev.length >= 4
          ? prev
          : [...prev, id],
    );

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of cart) {
      count += item.qty;
      const p = getProductById(item.productId);
      if (p) sum += p.price * item.qty;
    }
    return { cartCount: count, subtotal: sum };
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        cartCount,
        subtotal,
        cartOpen,
        setCartOpen,
        wishlist,
        toggleWishlist,
        compare,
        toggleCompare,
        clearCompare: () => setCompare([]),
        quickViewId,
        setQuickViewId,
        loginOpen,
        setLoginOpen,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
