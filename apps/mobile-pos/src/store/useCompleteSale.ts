import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { useTransactions } from "./TransactionsContext";
import { useOffline } from "./OfflineContext";
import { PaymentEntry, Transaction, TransactionItem } from "@/types";

/**
 * Builds the sale-completion action shared by Checkout and Split Payment:
 * snapshots the current cart into a Transaction, routes it through the
 * offline sync queue when there is no connection, and clears the cart.
 */
export function useCompleteSale() {
  const { cashier, outlet } = useAuth();
  const cart = useCart();
  const { createTransaction } = useTransactions();
  const { isOnline, enqueue } = useOffline();

  return function completeSale(payments: PaymentEntry[]): Transaction {
    if (!cashier || !outlet) {
      throw new Error("Cannot complete a sale without an authenticated cashier and outlet.");
    }

    const items: TransactionItem[] = cart.items.map((it) => {
      const lineTotal = cart.lineTotal(it);
      const discount = cart.lineDiscount(it);
      const unitGross = it.unitPrice + it.variantDelta + it.modifiers.reduce((s, m) => s + m.price, 0);
      return {
        productId: it.productId,
        name: it.name,
        variantLabel: it.variantLabel,
        modifiersLabel: it.modifiers.length ? it.modifiers.map((m) => m.name).join(", ") : undefined,
        unitPrice: unitGross,
        quantity: it.quantity,
        refundedQuantity: 0,
        discountAmount: discount,
        lineTotal: lineTotal - discount,
      };
    });

    const transaction = createTransaction({
      outletId: outlet.id,
      outletName: outlet.name,
      cashierId: cashier.id,
      cashierName: cashier.name,
      items,
      subtotal: cart.subtotal,
      itemDiscountTotal: cart.itemDiscountTotal,
      cartDiscountTotal: cart.cartDiscountAmount,
      promoDiscountTotal: cart.promoDiscountAmount,
      taxTotal: cart.taxTotal,
      grandTotal: cart.grandTotal,
      payments,
      offline: !isOnline,
    });

    if (!isOnline) {
      enqueue({
        transactionId: transaction.id,
        transactionNumber: transaction.transactionNumber,
        amount: transaction.grandTotal,
      });
    }

    cart.clearCart();
    return transaction;
  };
}
