import type { ComponentType } from "react";
import {
  DashboardIcon,
  ReceiptIcon,
  RefundIcon,
  ProductIcon,
  InventoryIcon,
  StockInIcon,
  StockOutIcon,
  OpnameIcon,
  SupplierIcon,
  ReportIcon,
  BellIcon,
  SettingsIcon,
  type IconProps,
} from "@/components/icons";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  group: "main" | "inventory" | "system";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon, group: "main" },
  { href: "/transactions", label: "Transactions", icon: ReceiptIcon, group: "main" },
  { href: "/refunds", label: "Refund", icon: RefundIcon, group: "main" },
  { href: "/products", label: "Products", icon: ProductIcon, group: "inventory" },
  { href: "/inventory", label: "Inventory", icon: InventoryIcon, group: "inventory" },
  { href: "/stock-in", label: "Stock In", icon: StockInIcon, group: "inventory" },
  { href: "/stock-out", label: "Stock Out", icon: StockOutIcon, group: "inventory" },
  { href: "/stock-opname", label: "Stock Opname", icon: OpnameIcon, group: "inventory" },
  { href: "/suppliers", label: "Suppliers", icon: SupplierIcon, group: "inventory" },
  { href: "/reports", label: "Reports", icon: ReportIcon, group: "system" },
  { href: "/notifications", label: "Notifications", icon: BellIcon, group: "system" },
  { href: "/settings", label: "Settings", icon: SettingsIcon, group: "system" },
];
