import { Ionicons } from "@expo/vector-icons";
import { PaymentMethod } from "@/types";

export const PAYMENT_METHODS: { key: Exclude<PaymentMethod, "split">; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "cash", label: "Tunai", icon: "cash-outline" },
  { key: "qris", label: "QRIS", icon: "qr-code-outline" },
  { key: "debit", label: "Debit", icon: "card-outline" },
  { key: "credit_card", label: "Kartu Kredit", icon: "card" },
  { key: "ewallet", label: "E-Wallet", icon: "wallet-outline" },
];

export function paymentLabel(method: string): string {
  switch (method) {
    case "cash":
      return "Tunai";
    case "qris":
      return "QRIS";
    case "debit":
      return "Debit";
    case "credit_card":
      return "Kartu Kredit";
    case "ewallet":
      return "E-Wallet";
    case "split":
      return "Split Payment";
    default:
      return method;
  }
}

export function paymentIcon(method: string): keyof typeof Ionicons.glyphMap {
  const found = PAYMENT_METHODS.find((m) => m.key === method);
  return found?.icon ?? "card-outline";
}
