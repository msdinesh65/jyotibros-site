'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

const MAX_LINE_QTY = 99;

export type CartItem = {
  slug: string;
  name: string;
  /** Display string e.g. ₹1,299 — kept for labels */
  price: string;
  /** Sale price per unit (INR), from catalog */
  unitPrice?: number;
  /** MRP per unit when on sale */
  originalPrice?: number;
  /** e.g. 30 for 30% off — shown in cart */
  discountPercent?: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  /** Add delta to line qty; at 0 or below the line is removed. */
  adjustLineQuantity: (slug: string, delta: number) => void;
  removeLine: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback<CartContextValue['addToCart']>((item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const adjustLineQuantity = useCallback((slug: string, delta: number) => {
    setItems((prev) =>
      prev.flatMap((p) => {
        if (p.slug !== slug) return [p];
        const next = p.quantity + delta;
        if (next < 1) return [];
        return [{ ...p, quantity: Math.min(MAX_LINE_QTY, next) }];
      })
    );
  }, []);

  const removeLine = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      adjustLineQuantity,
      removeLine,
      clearCart
    }),
    [items, addToCart, adjustLineQuantity, removeLine, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
