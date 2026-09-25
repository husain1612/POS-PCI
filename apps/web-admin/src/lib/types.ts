export type Status = "active" | "inactive" | "suspended";

export interface Organization {
  id: string;
  name: string;
  legalName: string;
  plan: "Essential" | "Professional";
  outletCount: number;
  userCount: number;
  joinedAt: string;
  status: Status;
}

export interface Outlet {
  id: string;
  name: string;
  code: string;
  manager: string;
  status: Status;
  address: string;
  city: string;
  phone: string;
  revenueThisMonth: number;
  transactionsThisMonth: number;
  employeeCount: number;
}

export type UserRole = "Admin" | "Outlet Manager" | "Cashier";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  outlet: string;
  status: Status;
  lastActive: string;
  avatarColor: string;
}

export type PermissionAction = "view" | "create" | "update" | "delete" | "approve" | "export";

export interface RoleDefinition {
  id: string;
  name: UserRole;
  description: string;
  userCount: number;
  permissions: Record<string, Record<PermissionAction, boolean>>;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  parent?: string;
  color: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: "active" | "inactive" | "low-stock" | "out-of-stock";
  outlet: string;
}

export type PromotionType = "percentage" | "fixed" | "bogo";

export interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  rule: string;
  scope: string;
  outletScope: string;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired" | "draft";
  redemptions: number;
}

export type TransactionStatus = "completed" | "refunded" | "voided" | "pending";

export interface Transaction {
  id: string;
  outlet: string;
  cashier: string;
  paymentMethod: "Cash" | "QRIS" | "Debit" | "Credit Card" | "E-Wallet" | "Split Payment";
  total: number;
  itemCount: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  outlet: string;
  currentStock: number;
  reservedStock: number;
  minimumStock: number;
  unit: string;
  stockValue: number;
  status: "healthy" | "low" | "out-of-stock";
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  outstandingPO: number;
  status: Status;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  module: string;
  data: string;
  timestamp: string;
}

export type NotificationKind =
  | "low-stock"
  | "out-of-stock"
  | "refund-request"
  | "stock-opname"
  | "sync-failed"
  | "system";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  outlet?: string;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface OutletRevenue {
  outlet: string;
  value: number;
}

export interface CategoryRevenue {
  category: string;
  value: number;
}

export interface PaymentSplit {
  method: string;
  value: number;
}
