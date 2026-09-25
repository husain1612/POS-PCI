import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, CartItemModifier, DiscountValue, Product } from "@/types";
import { generateId } from "@/utils/id";

export const TAX_RATE = 0.11;

export interface PromoState {
  code: string;
  label: string;
  percentage: number;
}

const PROMO_CODES: Record<string, { label: string; percentage: number }> = {
  NUSANTARA10: { label: "Promo Nusantara 10%", percentage: 0.1 },
  HEMAT5: { label: "Hemat Pagi 5%", percentage: 0.05 },
};

export interface AddItemInput {
  product: Product;
  quantity: number;
  variant?: { groupId: string; optionId: string; name: string; priceDelta: number };
  modifiers?: CartItemModifier[];
  notes?: string;
}

interface CartContextValue {
  items: CartItem[];
  cartDiscount: DiscountValue | null;
  promo: PromoState | null;
  addItem: (input: AddItemInput) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  setItemDiscount: (cartItemId: string, discount: DiscountValue | null) => void;
  setCartDiscount: (discount: DiscountValue | null) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  clearPromo: () => void;
  clearCart: () => void;
  getItemById: (cartItemId: string) => CartItem | undefined;
  lineTotal: (item: CartItem) => number;
  lineDiscount: (item: CartItem) => number;
  subtotal: number;
  itemDiscountTotal: number;
  cartDiscountAmount: number;
  promoDiscountAmount: number;
  taxableAmount: number;
  taxTotal: number;
  grandTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function computeDiscountAmount(discount: DiscountValue | null | undefined, base: number): number {
  if (!discount || base <= 0) return 0;
  if (discount.type === "percentage") {
    return Math.round(base * (discount.value / 100));
  }
  return Math.min(discount.value, base);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartDiscount, setCartDiscountState] = useState<DiscountValue | null>(null);
  const [promo, setPromo] = useState<PromoState | null>(null);

  const lineTotal = (item: CartItem) => (item.unitPrice + item.variantDelta) * item.quantity + item.modifiers.reduce((s, m) => s + m.price, 0) * item.quantity;
  const lineDiscount = (item: CartItem) => computeDiscountAmount(item.discount, lineTotal(item));

  const addItem = (input: AddItemInput) => {
    const modifiers = input.modifiers ?? [];
    const modifierIds = modifiers.map((m) => m.optionId).sort().join(",");

    setItems((prev) => {
      // Merge into an existing line only on an exact, discount-free match
      // (same product, variant, modifiers and notes).
      const matchIndex = prev.findIndex((it) => {
        if (it.discount) return false;
        if (it.productId !== input.product.id) return false;
        if (it.variantLabel !== input.variant?.name) return false;
        if ((it.notes ?? "") !== (input.notes ?? "")) return false;
        return modifierOptionIdsOf(it) === modifierIds;
      });

      if (matchIndex >= 0) {
        const next = [...prev];
        next[matchIndex] = {
          ...next[matchIndex],
          quantity: next[matchIndex].quantity + input.quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        cartItemId: generateId("cart"),
        productId: input.product.id,
        name: input.product.name,
        emoji: input.product.emoji,
        color: input.product.color,
        unitPrice: input.product.price,
        quantity: input.quantity,
        variantLabel: input.variant?.name,
        variantDelta: input.variant?.priceDelta ?? 0,
        modifiers,
        notes: input.notes,
      };
      return [...prev, newItem];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) => prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity } : it)));
  };

  const setItemDiscount = (cartItemId: string, discount: DiscountValue | null) => {
    setItems((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, discount: discount ?? undefined } : it))
    );
  };

  const setCartDiscount = (discount: DiscountValue | null) => setCartDiscountState(discount);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = PROMO_CODES[normalized];
    if (!found) {
      return { success: false, message: "Kode promo tidak ditemukan atau sudah kedaluwarsa." };
    }
    setPromo({ code: normalized, label: found.label, percentage: found.percentage });
    return { success: true, message: `Kode "${normalized}" berhasil diterapkan.` };
  };

  const clearPromo = () => setPromo(null);

  const clearCart = () => {
    setItems([]);
    setCartDiscountState(null);
    setPromo(null);
  };

  const getItemById = (cartItemId: string) => items.find((it) => it.cartItemId === cartItemId);

  const subtotal = items.reduce((sum, it) => sum + lineTotal(it), 0);
  const itemDiscountTotal = items.reduce((sum, it) => sum + lineDiscount(it), 0);
  const afterItemDiscounts = Math.max(subtotal - itemDiscountTotal, 0);
  const cartDiscountAmount = computeDiscountAmount(cartDiscount, afterItemDiscounts);
  const afterCartDiscount = Math.max(afterItemDiscounts - cartDiscountAmount, 0);
  const promoDiscountAmount = promo ? Math.round(afterCartDiscount * promo.percentage) : 0;
  const taxableAmount = Math.max(afterCartDiscount - promoDiscountAmount, 0);
  const taxTotal = Math.round(taxableAmount * TAX_RATE);
  const grandTotal = taxableAmount + taxTotal;
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      cartDiscount,
      promo,
      addItem,
      removeItem,
      updateQuantity,
      setItemDiscount,
      setCartDiscount,
      applyPromoCode,
      clearPromo,
      clearCart,
      getItemById,
      lineTotal,
      lineDiscount,
      subtotal,
      itemDiscountTotal,
      cartDiscountAmount,
      promoDiscountAmount,
      taxableAmount,
      taxTotal,
      grandTotal,
      itemCount,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, cartDiscount, promo]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function modifierOptionIdsOf(item: CartItem): string {
  return item.modifiers.map((m) => m.optionId).sort().join(",");
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
