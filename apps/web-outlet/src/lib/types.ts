export type TransactionStatus = "completed" | "refunded" | "partially_refunded" | "voided" | "pending";

export type PaymentMethod = "cash" | "qris" | "debit" | "credit_card" | "e_wallet" | "split";

export interface TransactionItem {
  id: string;
  productName: string;
  sku: string;
  qty: number;
  price: number;
  discount: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  code: string;
  date: string; // ISO
  cashier: string;
  itemCount: number;
  items: TransactionItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  outlet: string;
}

export type RefundStatus = "pending_review" | "approved" | "rejected" | "completed";

export interface RefundRequest {
  id: string;
  transactionCode: string;
  requestedBy: string;
  requestedAt: string;
  reason: string;
  items: { productName: string; qty: number; amount: number }[];
  amount: number;
  status: RefundStatus;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive";
  imageColor: string;
}

export type StockStatus = "healthy" | "low" | "out_of_stock" | "overstock";

export interface InventoryItem {
  id: string;
  sku: string;
  productName: string;
  category: string;
  unit: string;
  currentStock: number;
  reservedStock: number;
  minStock: number;
  avgCost: number;
  status: StockStatus;
  lastMovement: string;
}

export interface StockMovementLine {
  productName: string;
  sku: string;
  qty: number;
  unit: string;
  unitCost: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  productsSupplied: number;
  status: "active" | "inactive";
}

export type OpnameStatus = "draft" | "counting" | "submitted" | "approved" | "adjusted";

export interface StockOpnameItem {
  sku: string;
  productName: string;
  unit: string;
  systemQty: number;
  physicalQty: number;
  variance: number;
  note?: string;
}

export interface StockOpname {
  id: string;
  code: string;
  date: string;
  createdBy: string;
  status: OpnameStatus;
  itemCount: number;
  varianceCount: number;
  items: StockOpnameItem[];
  approvedBy?: string;
}

export type NotificationType =
  | "low_stock"
  | "out_of_stock"
  | "refund_request"
  | "opname_approval"
  | "sync_failed"
  | "system_alert";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
