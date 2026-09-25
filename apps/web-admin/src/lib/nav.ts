import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Store,
  Users,
  ShieldCheck,
  Package,
  Tags,
  BadgePercent,
  Receipt,
  Boxes,
  Truck,
  FileBarChart,
  ScrollText,
  Bell,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    items: [
      { label: "Organizations", href: "/organizations", icon: Building2 },
      { label: "Outlets", href: "/outlets", icon: Store },
      { label: "Users", href: "/users", icon: Users },
      { label: "Roles & Permissions", href: "/roles", icon: ShieldCheck },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/products", icon: Package },
      { label: "Categories", href: "/categories", icon: Tags },
      { label: "Promotions", href: "/promotions", icon: BadgePercent },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Transactions", href: "/transactions", icon: Receipt },
      { label: "Inventory", href: "/inventory", icon: Boxes },
      { label: "Suppliers", href: "/suppliers", icon: Truck },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Reports", href: "/reports", icon: FileBarChart },
      { label: "Audit Logs", href: "/audit-logs", icon: ScrollText },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
      { label: "System Settings", href: "/settings", icon: Settings },
    ],
  },
];
