import React, { createContext, useContext, useMemo, useState } from "react";
import { MOCK_TRANSACTIONS } from "@/data/mockData";
import { PaymentEntry, Transaction, TransactionItem } from "@/types";
import { generateId } from "@/utils/id";

export interface CreateTransactionInput {
  outletId: string;
  outletName: string;
  cashierId: string;
  cashierName: string;
  items: TransactionItem[];
  subtotal: number;
  itemDiscountTotal: number;
  cartDiscountTotal: number;
  promoDiscountTotal: number;
  taxTotal: number;
  grandTotal: number;
  payments: PaymentEntry[];
  offline: boolean;
}

interface TransactionsContextValue {
  transactions: Transaction[];
  lastTransactionId: string | null;
  getTransaction: (id: string) => Transaction | undefined;
  createTransaction: (input: CreateTransactionInput) => Transaction;
  refundTransaction: (
    id: string,
    payload: { items: { productId: string; quantity: number }[]; reason: string; amount: number }
  ) => void;
  voidTransaction: (id: string, reason: string) => void;
  markSynced: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

let counter = MOCK_TRANSACTIONS.length;

function nextTransactionNumber(): string {
  counter += 1;
  const now = new Date();
  const y = now.getFullYear();
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const d = now.getDate().toString().padStart(2, "0");
  return `TRX-${y}${m}${d}-${(1000 + counter).toString()}`;
}

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [lastTransactionId, setLastTransactionId] = useState<string | null>(null);

  const getTransaction = (id: string) => transactions.find((t) => t.id === id);

  const createTransaction = (input: CreateTransactionInput): Transaction => {
    const transaction: Transaction = {
      id: generateId("txn"),
      transactionNumber: nextTransactionNumber(),
      outletId: input.outletId,
      outletName: input.outletName,
      cashierId: input.cashierId,
      cashierName: input.cashierName,
      items: input.items,
      subtotal: input.subtotal,
      itemDiscountTotal: input.itemDiscountTotal,
      cartDiscountTotal: input.cartDiscountTotal,
      promoDiscountTotal: input.promoDiscountTotal,
      taxTotal: input.taxTotal,
      grandTotal: input.grandTotal,
      payments: input.payments,
      status: input.offline ? "pending_sync" : "completed",
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [transaction, ...prev]);
    setLastTransactionId(transaction.id);
    return transaction;
  };

  const refundTransaction: TransactionsContextValue["refundTransaction"] = (id, payload) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const refundQtyMap = new Map(payload.items.map((i) => [i.productId, i.quantity]));
        const items = t.items.map((item) => {
          const qty = refundQtyMap.get(item.productId);
          if (!qty) return item;
          return { ...item, refundedQuantity: Math.min(item.quantity, item.refundedQuantity + qty) };
        });
        const totalUnits = items.reduce((s, i) => s + i.quantity, 0);
        const refundedUnits = items.reduce((s, i) => s + i.refundedQuantity, 0);
        const isFull = refundedUnits >= totalUnits;
        return {
          ...t,
          items,
          status: isFull ? "refunded" : "partially_refunded",
          refundReason: payload.reason,
          refundAmount: (t.refundAmount ?? 0) + payload.amount,
        };
      })
    );
  };

  const voidTransaction = (id: string, reason: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "void", voidReason: reason } : t))
    );
  };

  const markSynced = (id: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t)));
  };

  const value = useMemo<TransactionsContextValue>(
    () => ({
      transactions,
      lastTransactionId,
      getTransaction,
      createTransaction,
      refundTransaction,
      voidTransaction,
      markSynced,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions, lastTransactionId]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within a TransactionsProvider");
  return ctx;
}
