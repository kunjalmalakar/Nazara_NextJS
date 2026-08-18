"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "./products";
import {
  apiLogin,
  apiLogout,
  apiRefresh,
  apiRegister,
  apiGetMe,
  apiUpdateProfile,
  type User,
} from "./api";

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
  
  // Real Auth State
  user: User | null;
  accessToken: string | null;
  isAuthLoading: boolean;
  loggedIn: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  updateProfile: (
    data: Partial<Pick<User, "fullName" | "phone" | "city" | "address">>,
  ) => Promise<User>;
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

  // Auth States
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Silent authentication check on mount via httpOnly refresh cookie
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        // Attempt silent refresh using the httpOnly cookie
        const refreshRes = await apiRefresh();
        if (!isMounted) return;

        setAccessToken(refreshRes.accessToken);

        // Fetch user profile using new access token
        const userRes = await apiGetMe(refreshRes.accessToken);
        if (isMounted) {
          setUser(userRes);
        }
      } catch {
        // Silent catch: if refresh fails (401 / no cookie), leave user as null
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    void checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const data = await apiLogin(email, password, rememberMe);
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const register = async (fullName: string, email: string, password: string) => {
    return await apiRegister(fullName, email, password);
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await apiLogout(accessToken);
      }
    } catch {
      // Ignore logout API errors and clear local state anyway
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const updateProfile = async (
    data: Partial<Pick<User, "fullName" | "phone" | "city" | "address">>,
  ) => {
    if (!accessToken) throw new Error("Not authenticated");
    const updated = await apiUpdateProfile(accessToken, data);
    setUser(updated);
    return updated;
  };

  const setLoggedIn = (v: boolean) => {
    if (!v) {
      void logout();
    }
  };

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
        user,
        accessToken,
        isAuthLoading,
        loggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
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
