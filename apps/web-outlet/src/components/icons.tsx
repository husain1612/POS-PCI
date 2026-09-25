import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export const DashboardIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

export const ReceiptIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 2.5h12v19l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V2.5Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>
);

export const RefundIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8V3m0 5h5" />
    <path d="M3.5 13a8.5 8.5 0 1 0 2.4-6.9L3 8" />
    <path d="M12 8.5v4l2.5 2" />
  </svg>
);

export const ProductIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 8.5 12 3 3 8.5l9 5.5 9-5.5Z" />
    <path d="M3 8.5V16l9 5 9-5V8.5M12 14v7" />
  </svg>
);

export const InventoryIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 7 12 3l8.5 4-8.5 4-8.5-4Z" />
    <path d="M3.5 7v10L12 21l8.5-4V7" />
    <path d="M12 11v10" />
  </svg>
);

export const StockInIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21V9m0 12-4.5-4.5M12 21l4.5-4.5" />
    <path d="M4 4h16" />
  </svg>
);

export const StockOutIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v12m0-12 4.5 4.5M12 3 7.5 7.5" />
    <path d="M4 21h16" />
  </svg>
);

export const OpnameIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 3v3.2c0 .44.36.8.8.8h6.4a.8.8 0 0 0 .8-.8V3" />
    <path d="m8.5 13.5 2 2 4.5-4.5" />
  </svg>
);

export const SupplierIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="9.5" width="9" height="8" rx="1" />
    <path d="M11.5 12h4.2L19 15.3V17.5a.5.5 0 0 1-.5.5H15" />
    <circle cx="7" cy="19.5" r="1.6" />
    <circle cx="16.5" cy="19.5" r="1.6" />
    <path d="M6 9.5V6.5a1 1 0 0 1 1-1h4" />
  </svg>
);

export const ReportIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3h9l4 4v14H6Z" />
    <path d="M15 3v4h4" />
    <path d="M9 13v4M12.5 10v7M16 15v2" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const SettingsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.05a1.7 1.7 0 0 0 1-1.55V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.05a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.05a1.7 1.7 0 0 0 1.55 1H19.5a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2 12h2.2M19.8 12H22M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 13 4 4 10-10" />
  </svg>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
    <path d="M12 10v4.2M12 17.3h.01" />
  </svg>
);

export const AlertCircleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13M12 16.3h.01" />
  </svg>
);

export const InboxIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 12.5h5l1.5 2.5h4l1.5-2.5h5" />
    <path d="M5.2 5.5h13.6l2.2 7v6a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-6l2.2-7Z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const DownloadIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v12m0 0-4-4m4 4 4-4" />
    <path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
  </svg>
);

export const FilterIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" />
  </svg>
);

export const LogOutIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 3.5H6a2 2 0 0 0-2 2V18.5a2 2 0 0 0 2 2h3" />
    <path d="M16 16.5 21 12l-5-4.5M21 12H9" />
  </svg>
);

export const BarcodeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16M8 4v16M11 4v16M14 4v16M17 4v10M20 4v16" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="7" width="11" height="10" rx="1" />
    <path d="M13.5 10.5H17l3.5 3.2V17h-3.5" />
    <circle cx="7" cy="18.5" r="1.6" />
    <circle cx="16.5" cy="18.5" r="1.6" />
  </svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDownRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 7 17 17M17 8v9H8" />
  </svg>
);

export const PackageXIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 8.5 12 3 3 8.5l9 5.5 9-5.5Z" />
    <path d="M3 8.5V16l9 5 9-5V8.5" />
    <path d="m9.5 12.5 5 5m0-5-5 5" />
  </svg>
);

export const SyncOffIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 3l18 18" />
    <path d="M4 9a8 8 0 0 1 13.9-4.3M20 15a8 8 0 0 1-13.9 4.3" />
    <path d="M20 4v5h-5M4 20v-5h5" />
  </svg>
);

export const InfoIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.6h.01" />
  </svg>
);
