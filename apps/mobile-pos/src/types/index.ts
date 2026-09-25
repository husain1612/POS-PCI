export type ID = string;

export interface Outlet {
  id: ID;
  name: string;
  code: string;
  address: string;
  city: string;
  isActive: boolean;
}

export type UserRole = "cashier" | "sales" | "outlet_staff";

export interface Cashier {
  id: ID;
  name: string;
  role: UserRole;
  initials: string;
  email: string;
}

export interface Category {
  id: ID;
  name: string;
  icon: string;
}

export interface VariantOption {
  id: ID;
  name: string;
  priceDelta: number;
}

export interface VariantGroup {
  id: ID;
  name: string;
  required: boolean;
  options: VariantOption[];
}

export interface ModifierOption {
  id: ID;
  name: string;
  price: number;
}

export interface ModifierGroup {
  id: ID;
  name: string;
  min: number;
  max: number;
  options: ModifierOption[];
}

export interface Product {
  id: ID;
  sku: string;
  barcode: string;
  name: string;
  categoryId: ID;
  price: number;
  stock: number;
  unit: string;
  emoji: string;
  color: string;
  description: string;
  variantGroups?: VariantGroup[];
  modifierGroups?: ModifierGroup[];
}

export interface DiscountValue {
  type: "percentage" | "fixed";
  value: number;
  reason?: string;
}

export interface CartItemModifier {
  groupId: ID;
  optionId: ID;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: ID;
  productId: ID;
  name: string;
  emoji: string;
  color: string;
  unitPrice: number;
  quantity: number;
  variantLabel?: string;
  variantDelta: number;
  modifiers: CartItemModifier[];
  notes?: string;
  discount?: DiscountValue;
}

export type PaymentMethod =
  | "cash"
  | "qris"
  | "debit"
  | "credit_card"
  | "ewallet"
  | "split";

export interface PaymentEntry {
  method: Exclude<PaymentMethod, "split">;
  amount: number;
}

export type TransactionStatus =
  | "completed"
  | "void"
  | "refunded"
  | "partially_refunded"
  | "pending_sync";

export interface TransactionItem {
  productId: ID;
  name: string;
  variantLabel?: string;
  modifiersLabel?: string;
  unitPrice: number;
  quantity: number;
  refundedQuantity: number;
  discountAmount: number;
  lineTotal: number;
}

export interface Transaction {
  id: ID;
  transactionNumber: string;
  outletId: ID;
  outletName: string;
  cashierId: ID;
  cashierName: string;
  items: TransactionItem[];
  subtotal: number;
  itemDiscountTotal: number;
  cartDiscountTotal: number;
  promoDiscountTotal: number;
  taxTotal: number;
  grandTotal: number;
  payments: PaymentEntry[];
  status: TransactionStatus;
  createdAt: string;
  refundReason?: string;
  refundAmount?: number;
  voidReason?: string;
}

export type SyncQueueStatus = "pending" | "syncing" | "failed" | "synced";

export interface SyncQueueItem {
  id: ID;
  transactionId: ID;
  transactionNumber: string;
  createdAt: string;
  amount: number;
  status: SyncQueueStatus;
  retryCount: number;
}
