import type {
  AppNotification,
  InventoryItem,
  Product,
  RefundRequest,
  StockOpname,
  Supplier,
  Transaction,
} from "./types";

export const OUTLET = {
  name: "Kopi Nusantara - Kemang",
  code: "OUT-JKT-003",
  address: "Jl. Kemang Raya No. 45, Jakarta Selatan",
  manager: "Dewi Anggraini",
};

export const CURRENT_USER = {
  name: "Dewi Anggraini",
  role: "Outlet Manager",
  initials: "DA",
};

export const CATEGORIES = [
  "Kopi",
  "Non-Kopi",
  "Makanan Berat",
  "Snack",
  "Pastry",
  "Bahan Baku",
];

export const PRODUCTS: Product[] = [
  { id: "p1", sku: "KSU-001", name: "Kopi Susu Gula Aren", category: "Kopi", unit: "cup", price: 22000, cost: 9500, stock: 84, minStock: 20, status: "active", imageColor: "#c7a17a" },
  { id: "p2", sku: "AME-002", name: "Americano", category: "Kopi", unit: "cup", price: 18000, cost: 6000, stock: 120, minStock: 25, status: "active", imageColor: "#6b4226" },
  { id: "p3", sku: "CPC-003", name: "Cappuccino", category: "Kopi", unit: "cup", price: 24000, cost: 9000, stock: 65, minStock: 20, status: "active", imageColor: "#a9744f" },
  { id: "p4", sku: "MTC-004", name: "Matcha Latte", category: "Non-Kopi", unit: "cup", price: 26000, cost: 11000, stock: 18, minStock: 20, status: "active", imageColor: "#7a9b5c" },
  { id: "p5", sku: "CKL-005", name: "Coklat Dingin", category: "Non-Kopi", unit: "cup", price: 23000, cost: 9500, stock: 40, minStock: 15, status: "active", imageColor: "#5c3a2e" },
  { id: "p6", sku: "NGR-006", name: "Nasi Goreng Rempah", category: "Makanan Berat", unit: "porsi", price: 32000, cost: 15000, stock: 12, minStock: 15, status: "active", imageColor: "#d98f3b" },
  { id: "p7", sku: "AYG-007", name: "Ayam Geprek Sambal Korek", category: "Makanan Berat", unit: "porsi", price: 28000, cost: 13500, stock: 9, minStock: 15, status: "active", imageColor: "#c0392b" },
  { id: "p8", sku: "CRO-008", name: "Croissant Butter", category: "Pastry", unit: "pcs", price: 19000, cost: 8500, stock: 22, minStock: 10, status: "active", imageColor: "#e2b45a" },
  { id: "p9", sku: "KTG-009", name: "Kentang Goreng", category: "Snack", unit: "porsi", price: 15000, cost: 6000, stock: 55, minStock: 20, status: "active", imageColor: "#e8c26a" },
  { id: "p10", sku: "PIS-010", name: "Pisang Goreng Coklat Keju", category: "Snack", unit: "porsi", price: 17000, cost: 7000, stock: 0, minStock: 15, status: "active", imageColor: "#8a5a2b" },
  { id: "p11", sku: "BSU-011", name: "Biji Kopi Arabika Gayo 1kg", category: "Bahan Baku", unit: "kg", price: 185000, cost: 130000, stock: 34, minStock: 10, status: "active", imageColor: "#3d2b1f" },
  { id: "p12", sku: "SGA-012", name: "Gula Aren Cair 1L", category: "Bahan Baku", unit: "botol", price: 45000, cost: 28000, stock: 14, minStock: 10, status: "active", imageColor: "#7a4a1e" },
  { id: "p13", sku: "SSU-013", name: "Susu UHT Full Cream 1L", category: "Bahan Baku", unit: "liter", price: 21000, cost: 16500, stock: 60, minStock: 24, status: "active", imageColor: "#f0ead6" },
  { id: "p14", sku: "TEH-014", name: "Es Teh Manis", category: "Non-Kopi", unit: "cup", price: 10000, cost: 3000, stock: 150, minStock: 30, status: "active", imageColor: "#b58b3f" },
  { id: "p15", sku: "RTA-015", name: "Red Velvet Latte", category: "Non-Kopi", unit: "cup", price: 27000, cost: 12000, stock: 5, minStock: 15, status: "active", imageColor: "#8e2a3b" },
];

export const SUPPLIERS: Supplier[] = [
  { id: "s1", name: "CV Berkah Kopi Nusantara", contactPerson: "Budi Santoso", phone: "0812-3456-7890", email: "budi@berkahkopi.id", address: "Jl. Raya Puncak No. 12, Bogor", productsSupplied: 6, status: "active" },
  { id: "s2", name: "PT Susu Segar Indonesia", contactPerson: "Rina Marlina", phone: "0813-2211-9080", email: "rina@sususegar.co.id", address: "Jl. Industri Susu No. 8, Bandung", productsSupplied: 3, status: "active" },
  { id: "s3", name: "UD Gula Aren Asli Lampung", contactPerson: "Agus Prasetyo", phone: "0857-1122-3344", email: "agus@gularen-lampung.com", address: "Jl. Lintas Sumatera KM 21, Lampung", productsSupplied: 2, status: "active" },
  { id: "s4", name: "Toko Kemasan Jaya Abadi", contactPerson: "Siti Hardiyanti", phone: "0819-8877-6655", email: "siti@kemasanjaya.id", address: "Jl. Gudang Peluru No. 3, Jakarta Timur", productsSupplied: 8, status: "active" },
  { id: "s5", name: "CV Sayur & Bumbu Segar", contactPerson: "Hendra Wijaya", phone: "0878-4433-2211", email: "hendra@sayurbumbu.id", address: "Pasar Induk Kramat Jati, Jakarta Timur", productsSupplied: 5, status: "inactive" },
];

const CASHIERS = ["Rangga Pratama", "Nadia Kusuma", "Fajar Hidayat", "Melati Putri"];
const PAYMENT_METHODS: Transaction["paymentMethod"][] = ["cash", "qris", "debit", "credit_card", "e_wallet"];
const STATUSES: Transaction["status"][] = ["completed", "completed", "completed", "completed", "refunded", "partially_refunded", "voided", "pending"];

function pad(n: number, len = 4) {
  return n.toString().padStart(len, "0");
}

function seededPick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export const TRANSACTIONS: Transaction[] = Array.from({ length: 28 }).map((_, i) => {
  const day = 25 - Math.floor(i / 3);
  const hour = 8 + (i % 11);
  const minute = (i * 7) % 60;
  const date = new Date(2026, 8, Math.max(1, day), hour, minute).toISOString();
  const items = [
    { name: seededPick(PRODUCTS, i).name, sku: seededPick(PRODUCTS, i).sku, qty: 1 + (i % 3), price: seededPick(PRODUCTS, i).price },
    { name: seededPick(PRODUCTS, i + 4).name, sku: seededPick(PRODUCTS, i + 4).sku, qty: 1 + ((i + 1) % 2), price: seededPick(PRODUCTS, i + 4).price },
  ];
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const discount = i % 5 === 0 ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.11);
  const total = subtotal - discount + tax;
  const status = seededPick(STATUSES, i);
  return {
    id: `t${i + 1}`,
    code: `TRX-20260925-${pad(120 - i)}`,
    date,
    cashier: seededPick(CASHIERS, i),
    itemCount: items.reduce((s, it) => s + it.qty, 0),
    items: items.map((it, idx) => ({
      id: `t${i + 1}-item${idx}`,
      productName: it.name,
      sku: it.sku,
      qty: it.qty,
      price: it.price,
      discount: idx === 0 ? discount : 0,
      subtotal: it.price * it.qty,
    })),
    subtotal,
    discount,
    tax,
    total,
    paymentMethod: seededPick(PAYMENT_METHODS, i),
    status,
    outlet: OUTLET.name,
  };
});

export const REFUND_REQUESTS: RefundRequest[] = [
  {
    id: "r1",
    transactionCode: "TRX-20260925-114",
    requestedBy: "Rangga Pratama",
    requestedAt: new Date(2026, 8, 25, 10, 15).toISOString(),
    reason: "Pesanan salah dibuat — pelanggan meminta Matcha Latte tapi tercatat Cappuccino",
    items: [{ productName: "Cappuccino", qty: 1, amount: 24000 }],
    amount: 24000,
    status: "pending_review",
  },
  {
    id: "r2",
    transactionCode: "TRX-20260925-109",
    requestedBy: "Nadia Kusuma",
    requestedAt: new Date(2026, 8, 25, 9, 40).toISOString(),
    reason: "Produk rusak — croissant sudah tidak layak saji saat diserahkan ke pelanggan",
    items: [{ productName: "Croissant Butter", qty: 2, amount: 38000 }],
    amount: 38000,
    status: "pending_review",
  },
  {
    id: "r3",
    transactionCode: "TRX-20260924-096",
    requestedBy: "Fajar Hidayat",
    requestedAt: new Date(2026, 8, 24, 16, 5).toISOString(),
    reason: "Pelanggan membatalkan pesanan sebelum diproses barista",
    items: [{ productName: "Red Velvet Latte", qty: 1, amount: 27000 }],
    amount: 27000,
    status: "approved",
  },
  {
    id: "r4",
    transactionCode: "TRX-20260924-081",
    requestedBy: "Melati Putri",
    requestedAt: new Date(2026, 8, 24, 13, 20).toISOString(),
    reason: "Kesalahan input jumlah item pada kasir",
    items: [{ productName: "Es Teh Manis", qty: 3, amount: 30000 }],
    amount: 30000,
    status: "completed",
  },
  {
    id: "r5",
    transactionCode: "TRX-20260923-072",
    requestedBy: "Rangga Pratama",
    requestedAt: new Date(2026, 8, 23, 11, 50).toISOString(),
    reason: "Permintaan pelanggan tanpa alasan yang memenuhi kebijakan refund",
    items: [{ productName: "Nasi Goreng Rempah", qty: 1, amount: 32000 }],
    amount: 32000,
    status: "rejected",
  },
];

function stockStatus(current: number, min: number): InventoryItem["status"] {
  if (current <= 0) return "out_of_stock";
  if (current < min) return "low";
  if (current > min * 4) return "overstock";
  return "healthy";
}

export const INVENTORY: InventoryItem[] = PRODUCTS.map((p, i) => {
  const reserved = [3, 0, 2, 0, 1, 0, 4, 0, 2, 0, 0, 1, 3, 5, 0][i] ?? 0;
  return {
    id: `inv-${p.id}`,
    sku: p.sku,
    productName: p.name,
    category: p.category,
    unit: p.unit,
    currentStock: p.stock,
    reservedStock: reserved,
    minStock: p.minStock,
    avgCost: p.cost,
    status: stockStatus(p.stock, p.minStock),
    lastMovement: new Date(2026, 8, 25 - (i % 6)).toISOString(),
  };
});

export const STOCK_OPNAMES: StockOpname[] = [
  {
    id: "so1",
    code: "SO-20260925-01",
    date: new Date(2026, 8, 25, 7, 30).toISOString(),
    createdBy: "Dewi Anggraini",
    status: "counting",
    itemCount: 15,
    varianceCount: 0,
    items: PRODUCTS.map((p) => ({
      sku: p.sku,
      productName: p.name,
      unit: p.unit,
      systemQty: p.stock,
      physicalQty: p.stock,
      variance: 0,
    })),
  },
  {
    id: "so2",
    code: "SO-20260918-01",
    date: new Date(2026, 8, 18, 7, 30).toISOString(),
    createdBy: "Dewi Anggraini",
    status: "adjusted",
    approvedBy: "Bapak Herman Wijaya (Area Supervisor)",
    itemCount: 15,
    varianceCount: 4,
    items: [
      { sku: "KSU-001", productName: "Kopi Susu Gula Aren", unit: "cup", systemQty: 90, physicalQty: 87, variance: -3, note: "Selisih diduga akibat sample tester" },
      { sku: "NGR-006", productName: "Nasi Goreng Rempah", unit: "porsi", systemQty: 18, physicalQty: 15, variance: -3, note: "Kesalahan pencatatan retur bahan" },
      { sku: "SSU-013", productName: "Susu UHT Full Cream 1L", unit: "liter", systemQty: 58, physicalQty: 62, variance: 4, note: "Kelebihan input stok masuk sebelumnya" },
      { sku: "PIS-010", productName: "Pisang Goreng Coklat Keju", unit: "porsi", systemQty: 6, physicalQty: 4, variance: -2, note: "Produk kadaluarsa dibuang" },
      { sku: "AME-002", productName: "Americano", unit: "cup", systemQty: 130, physicalQty: 130, variance: 0 },
    ],
  },
  {
    id: "so3",
    code: "SO-20260911-01",
    date: new Date(2026, 8, 11, 7, 30).toISOString(),
    createdBy: "Dewi Anggraini",
    status: "adjusted",
    approvedBy: "Bapak Herman Wijaya (Area Supervisor)",
    itemCount: 15,
    varianceCount: 1,
    items: [
      { sku: "BSU-011", productName: "Biji Kopi Arabika Gayo 1kg", unit: "kg", systemQty: 40, physicalQty: 38, variance: -2, note: "Susut penggilingan" },
    ],
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  { id: "n1", type: "out_of_stock", title: "Stok Habis", message: "Pisang Goreng Coklat Keju (PIS-010) telah habis di outlet ini.", time: new Date(2026, 8, 25, 11, 5).toISOString(), read: false },
  { id: "n2", type: "refund_request", title: "Permintaan Refund Baru", message: "Rangga Pratama mengajukan refund untuk TRX-20260925-114 senilai Rp24.000.", time: new Date(2026, 8, 25, 10, 16).toISOString(), read: false },
  { id: "n3", type: "low_stock", title: "Stok Menipis", message: "Red Velvet Latte (RTA-015) tersisa 5, di bawah minimum 15.", time: new Date(2026, 8, 25, 9, 0).toISOString(), read: false },
  { id: "n4", type: "low_stock", title: "Stok Menipis", message: "Matcha Latte (MTC-004) tersisa 18, mendekati batas minimum 20.", time: new Date(2026, 8, 25, 8, 45).toISOString(), read: true },
  { id: "n5", type: "opname_approval", title: "Stock Opname Disetujui", message: "SO-20260918-01 telah disetujui oleh Herman Wijaya dan siap diadjust.", time: new Date(2026, 8, 19, 9, 0).toISOString(), read: true },
  { id: "n6", type: "sync_failed", title: "Sinkronisasi Gagal", message: "3 transaksi dari Mobile POS #Kasir-2 gagal disinkronkan ke server pusat.", time: new Date(2026, 8, 24, 21, 12).toISOString(), read: true },
  { id: "n7", type: "system_alert", title: "Pemeliharaan Sistem", message: "Pemeliharaan terjadwal pada Minggu, 28 Sep 2026 pukul 02.00–04.00 WIB.", time: new Date(2026, 8, 23, 15, 0).toISOString(), read: true },
  { id: "n8", type: "low_stock", title: "Stok Menipis", message: "Nasi Goreng Rempah (NGR-006) tersisa 12, di bawah minimum 15.", time: new Date(2026, 8, 25, 7, 50).toISOString(), read: false },
];

export const DASHBOARD_STATS = {
  revenue: 18450000,
  revenueDelta: 8.2,
  transactions: 214,
  transactionsDelta: 4.6,
  avgBasket: 86215,
  avgBasketDelta: -1.3,
  grossProfit: 7920000,
  grossProfitDelta: 6.1,
  lowStockCount: INVENTORY.filter((i) => i.status === "low" || i.status === "out_of_stock").length,
};

export const REVENUE_TREND = [
  { label: "19 Sep", value: 14250000 },
  { label: "20 Sep", value: 15800000 },
  { label: "21 Sep", value: 17650000 },
  { label: "22 Sep", value: 13400000 },
  { label: "23 Sep", value: 16200000 },
  { label: "24 Sep", value: 19100000 },
  { label: "25 Sep", value: 18450000 },
];

export const SALES_BY_PAYMENT = [
  { method: "QRIS", value: 7820000, color: "var(--color-brand-500)" },
  { method: "Cash", value: 5230000, color: "var(--color-success-500)" },
  { method: "Debit", value: 2940000, color: "var(--color-warning-500)" },
  { method: "E-Wallet", value: 1850000, color: "#8b5cf6" },
  { method: "Credit Card", value: 610000, color: "#0ea5e9" },
];

export const TOP_PRODUCTS = [
  { name: "Kopi Susu Gula Aren", qty: 312, revenue: 6864000 },
  { name: "Americano", qty: 248, revenue: 4464000 },
  { name: "Cappuccino", qty: 190, revenue: 4560000 },
  { name: "Es Teh Manis", qty: 175, revenue: 1750000 },
  { name: "Nasi Goreng Rempah", qty: 96, revenue: 3072000 },
];

export const TOP_CATEGORIES = [
  { name: "Kopi", revenue: 15888000, share: 46 },
  { name: "Non-Kopi", revenue: 8120000, share: 24 },
  { name: "Makanan Berat", revenue: 5760000, share: 17 },
  { name: "Snack", revenue: 2890000, share: 8 },
  { name: "Pastry", revenue: 1710000, share: 5 },
];

export const FAST_MOVING = [
  { name: "Kopi Susu Gula Aren", unitsPerDay: 44.6 },
  { name: "Americano", unitsPerDay: 35.4 },
  { name: "Es Teh Manis", unitsPerDay: 25.0 },
  { name: "Cappuccino", unitsPerDay: 27.1 },
];

export const SLOW_MOVING = [
  { name: "Pisang Goreng Coklat Keju", unitsPerDay: 0.6 },
  { name: "Red Velvet Latte", unitsPerDay: 0.7 },
  { name: "Gula Aren Cair 1L", unitsPerDay: 1.1 },
  { name: "Matcha Latte", unitsPerDay: 2.6 },
];
