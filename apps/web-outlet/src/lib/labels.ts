import type {
  NotificationType,
  OpnameStatus,
  PaymentMethod,
  RefundStatus,
  StockStatus,
  TransactionStatus,
} from "./types";

type BadgeVariant = "brand" | "success" | "warning" | "error" | "neutral" | "info";

export const TRANSACTION_STATUS_LABEL: Record<TransactionStatus, string> = {
  completed: "Selesai",
  refunded: "Direfund",
  partially_refunded: "Refund Sebagian",
  voided: "Dibatalkan",
  pending: "Menunggu",
};

export const TRANSACTION_STATUS_VARIANT: Record<TransactionStatus, BadgeVariant> = {
  completed: "success",
  refunded: "error",
  partially_refunded: "warning",
  voided: "neutral",
  pending: "info",
};

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "Tunai",
  qris: "QRIS",
  debit: "Kartu Debit",
  credit_card: "Kartu Kredit",
  e_wallet: "E-Wallet",
  split: "Split Payment",
};

export const REFUND_STATUS_LABEL: Record<RefundStatus, string> = {
  pending_review: "Menunggu Review",
  approved: "Disetujui",
  rejected: "Ditolak",
  completed: "Selesai",
};

export const REFUND_STATUS_VARIANT: Record<RefundStatus, BadgeVariant> = {
  pending_review: "warning",
  approved: "info",
  rejected: "error",
  completed: "success",
};

export const STOCK_STATUS_LABEL: Record<StockStatus, string> = {
  healthy: "Aman",
  low: "Menipis",
  out_of_stock: "Habis",
  overstock: "Berlebih",
};

export const STOCK_STATUS_VARIANT: Record<StockStatus, BadgeVariant> = {
  healthy: "success",
  low: "warning",
  out_of_stock: "error",
  overstock: "info",
};

export const OPNAME_STATUS_LABEL: Record<OpnameStatus, string> = {
  draft: "Draf",
  counting: "Sedang Dihitung",
  submitted: "Diajukan",
  approved: "Disetujui",
  adjusted: "Sudah Disesuaikan",
};

export const OPNAME_STATUS_VARIANT: Record<OpnameStatus, BadgeVariant> = {
  draft: "neutral",
  counting: "info",
  submitted: "warning",
  approved: "success",
  adjusted: "success",
};

export const NOTIFICATION_TYPE_LABEL: Record<NotificationType, string> = {
  low_stock: "Stok Menipis",
  out_of_stock: "Stok Habis",
  refund_request: "Permintaan Refund",
  opname_approval: "Persetujuan Opname",
  sync_failed: "Sinkronisasi Gagal",
  system_alert: "Peringatan Sistem",
};

export const NOTIFICATION_TYPE_VARIANT: Record<NotificationType, BadgeVariant> = {
  low_stock: "warning",
  out_of_stock: "error",
  refund_request: "info",
  opname_approval: "success",
  sync_failed: "error",
  system_alert: "neutral",
};
