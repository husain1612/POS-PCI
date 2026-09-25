import type {
  AdminUser,
  AuditLogEntry,
  Category,
  CategoryRevenue,
  InventoryItem,
  NotificationItem,
  Organization,
  Outlet,
  OutletRevenue,
  PaymentSplit,
  Product,
  Promotion,
  RevenuePoint,
  RoleDefinition,
  Supplier,
  Transaction,
} from "./types";

// ---------------------------------------------------------------------------
// This file contains hardcoded, realistic-looking Indonesian sample data used
// to render functional-looking placeholder pages. No network calls are made.
// ---------------------------------------------------------------------------

export const dashboardStats = {
  totalRevenue: 487_650_000,
  totalRevenueDelta: 12.4,
  activeOutlets: 8,
  activeOutletsDelta: 1,
  activeUsers: 46,
  activeUsersDelta: 3.1,
  transactions: 18_204,
  transactionsDelta: 8.7,
  productCount: 612,
  productCountDelta: 2.2,
};

export const revenueTrend: RevenuePoint[] = [
  { label: "1 Sep", value: 12_400_000 },
  { label: "3 Sep", value: 14_100_000 },
  { label: "5 Sep", value: 13_050_000 },
  { label: "7 Sep", value: 16_800_000 },
  { label: "9 Sep", value: 15_200_000 },
  { label: "11 Sep", value: 18_600_000 },
  { label: "13 Sep", value: 17_450_000 },
  { label: "15 Sep", value: 19_900_000 },
  { label: "17 Sep", value: 21_300_000 },
  { label: "19 Sep", value: 18_950_000 },
  { label: "21 Sep", value: 22_700_000 },
  { label: "23 Sep", value: 24_100_000 },
  { label: "25 Sep", value: 23_400_000 },
];

export const revenueByOutlet: OutletRevenue[] = [
  { outlet: "Kemang", value: 98_400_000 },
  { outlet: "Senopati", value: 87_100_000 },
  { outlet: "PIK Avenue", value: 74_650_000 },
  { outlet: "Kelapa Gading", value: 61_200_000 },
  { outlet: "Bintaro", value: 52_800_000 },
  { outlet: "BSD City", value: 47_300_000 },
  { outlet: "Dago", value: 39_900_000 },
  { outlet: "Malioboro", value: 26_300_000 },
];

export const revenueByCategory: CategoryRevenue[] = [
  { category: "Kopi & Minuman", value: 186_400_000 },
  { category: "Makanan Berat", value: 124_800_000 },
  { category: "Pastry & Roti", value: 78_200_000 },
  { category: "Dessert", value: 54_100_000 },
  { category: "Merchandise", value: 21_650_000 },
  { category: "Lainnya", value: 22_500_000 },
];

export const paymentDistribution: PaymentSplit[] = [
  { method: "QRIS", value: 42 },
  { method: "Cash", value: 24 },
  { method: "Debit", value: 16 },
  { method: "E-Wallet", value: 12 },
  { method: "Credit Card", value: 6 },
];

export const outletComparison = revenueByOutlet.map((o, i) => ({
  outlet: o.outlet,
  revenue: o.value,
  transactions: 2400 - i * 210,
  avgBasket: 68_000 + i * 3200,
}));

export const organizations: Organization[] = [
  {
    id: "org-01",
    name: "Kopi Kenangan Group",
    legalName: "PT Kopi Kenangan Nusantara",
    plan: "Professional",
    outletCount: 8,
    userCount: 46,
    joinedAt: "2023-02-14",
    status: "active",
  },
  {
    id: "org-02",
    name: "Warung Makan Sederhana",
    legalName: "CV Sederhana Boga",
    plan: "Essential",
    outletCount: 3,
    userCount: 14,
    joinedAt: "2024-06-01",
    status: "active",
  },
  {
    id: "org-03",
    name: "Toko Roti Anggun",
    legalName: "PT Anggun Bakery Indonesia",
    plan: "Professional",
    outletCount: 2,
    userCount: 9,
    joinedAt: "2024-11-20",
    status: "suspended",
  },
];

export const outlets: Outlet[] = [
  {
    id: "otl-01",
    name: "Kemang",
    code: "KMG-001",
    manager: "Dewi Anggraini",
    status: "active",
    address: "Jl. Kemang Raya No. 45",
    city: "Jakarta Selatan",
    phone: "021-7194532",
    revenueThisMonth: 98_400_000,
    transactionsThisMonth: 2413,
    employeeCount: 9,
  },
  {
    id: "otl-02",
    name: "Senopati",
    code: "SNP-002",
    manager: "Bagus Prasetyo",
    status: "active",
    address: "Jl. Senopati No. 12A",
    city: "Jakarta Selatan",
    phone: "021-5203471",
    revenueThisMonth: 87_100_000,
    transactionsThisMonth: 2190,
    employeeCount: 8,
  },
  {
    id: "otl-03",
    name: "PIK Avenue",
    code: "PIK-003",
    manager: "Siti Rahmawati",
    status: "active",
    address: "Ruko PIK Avenue Blok C No. 8",
    city: "Jakarta Utara",
    phone: "021-5601298",
    revenueThisMonth: 74_650_000,
    transactionsThisMonth: 1987,
    employeeCount: 7,
  },
  {
    id: "otl-04",
    name: "Kelapa Gading",
    code: "KLG-004",
    manager: "Agus Setiawan",
    status: "active",
    address: "Mall Kelapa Gading 3, Lt. GF",
    city: "Jakarta Utara",
    phone: "021-4529871",
    revenueThisMonth: 61_200_000,
    transactionsThisMonth: 1756,
    employeeCount: 6,
  },
  {
    id: "otl-05",
    name: "Bintaro",
    code: "BTR-005",
    manager: "Rina Kusuma",
    status: "active",
    address: "Jl. Bintaro Utama Sektor 3A No. 21",
    city: "Tangerang Selatan",
    phone: "021-7451093",
    revenueThisMonth: 52_800_000,
    transactionsThisMonth: 1542,
    employeeCount: 6,
  },
  {
    id: "otl-06",
    name: "BSD City",
    code: "BSD-006",
    manager: "Fajar Nugraha",
    status: "active",
    address: "AEON Mall BSD City, Lt. 1",
    city: "Tangerang Selatan",
    phone: "021-2950172",
    revenueThisMonth: 47_300_000,
    transactionsThisMonth: 1398,
    employeeCount: 5,
  },
  {
    id: "otl-07",
    name: "Dago",
    code: "DGO-007",
    manager: "Hana Puspitasari",
    status: "inactive",
    address: "Jl. Ir. H. Juanda No. 88",
    city: "Bandung",
    phone: "022-2534891",
    revenueThisMonth: 0,
    transactionsThisMonth: 0,
    employeeCount: 4,
  },
  {
    id: "otl-08",
    name: "Malioboro",
    code: "MLB-008",
    manager: "Yusuf Hidayat",
    status: "active",
    address: "Jl. Malioboro No. 152",
    city: "Yogyakarta",
    phone: "0274-563921",
    revenueThisMonth: 26_300_000,
    transactionsThisMonth: 894,
    employeeCount: 5,
  },
];

export const adminUsers: AdminUser[] = [
  { id: "usr-01", name: "Dewi Anggraini", email: "dewi.anggraini@kopikenangan.id", role: "Outlet Manager", outlet: "Kemang", status: "active", lastActive: "2026-09-25T08:12:00", avatarColor: "chart-1" },
  { id: "usr-02", name: "Bagus Prasetyo", email: "bagus.prasetyo@kopikenangan.id", role: "Outlet Manager", outlet: "Senopati", status: "active", lastActive: "2026-09-25T07:45:00", avatarColor: "chart-2" },
  { id: "usr-03", name: "Siti Rahmawati", email: "siti.rahmawati@kopikenangan.id", role: "Outlet Manager", outlet: "PIK Avenue", status: "active", lastActive: "2026-09-24T19:20:00", avatarColor: "chart-3" },
  { id: "usr-04", name: "Agus Setiawan", email: "agus.setiawan@kopikenangan.id", role: "Outlet Manager", outlet: "Kelapa Gading", status: "active", lastActive: "2026-09-24T16:02:00", avatarColor: "chart-4" },
  { id: "usr-05", name: "Rina Kusuma", email: "rina.kusuma@kopikenangan.id", role: "Cashier", outlet: "Bintaro", status: "active", lastActive: "2026-09-25T09:01:00", avatarColor: "chart-5" },
  { id: "usr-06", name: "Fajar Nugraha", email: "fajar.nugraha@kopikenangan.id", role: "Cashier", outlet: "BSD City", status: "active", lastActive: "2026-09-25T08:55:00", avatarColor: "chart-6" },
  { id: "usr-07", name: "Hana Puspitasari", email: "hana.puspitasari@kopikenangan.id", role: "Outlet Manager", outlet: "Dago", status: "inactive", lastActive: "2026-08-30T11:10:00", avatarColor: "chart-7" },
  { id: "usr-08", name: "Yusuf Hidayat", email: "yusuf.hidayat@kopikenangan.id", role: "Cashier", outlet: "Malioboro", status: "active", lastActive: "2026-09-25T06:30:00", avatarColor: "chart-8" },
  { id: "usr-09", name: "Nadia Permata", email: "nadia.permata@kopikenangan.id", role: "Admin", outlet: "Head Office", status: "active", lastActive: "2026-09-25T09:20:00", avatarColor: "chart-1" },
  { id: "usr-10", name: "Rizky Ramadhan", email: "rizky.ramadhan@kopikenangan.id", role: "Cashier", outlet: "Kemang", status: "suspended", lastActive: "2026-09-10T13:44:00", avatarColor: "chart-2" },
];

export const permissionModules = [
  "Dashboard",
  "Outlets",
  "Users",
  "Products",
  "Promotions",
  "Transactions",
  "Inventory",
  "Reports",
];

function buildPermissions(level: "full" | "manager" | "cashier") {
  const actions = ["view", "create", "update", "delete", "approve", "export"] as const;
  const result: RoleDefinition["permissions"] = {};
  for (const mod of permissionModules) {
    result[mod] = {} as RoleDefinition["permissions"][string];
    for (const action of actions) {
      let allowed = false;
      if (level === "full") allowed = true;
      if (level === "manager") {
        allowed = ["view", "create", "update", "export"].includes(action) && mod !== "Users";
        if (mod === "Transactions" && action === "approve") allowed = true;
        if (mod === "Inventory" && action === "approve") allowed = true;
      }
      if (level === "cashier") {
        allowed = action === "view" && ["Dashboard", "Products", "Transactions"].includes(mod);
        if (mod === "Transactions" && action === "create") allowed = true;
      }
      result[mod][action] = allowed;
    }
  }
  return result;
}

export const roles: RoleDefinition[] = [
  {
    id: "role-admin",
    name: "Admin",
    description: "Full access to every module across all outlets and organizations.",
    userCount: 4,
    permissions: buildPermissions("full"),
  },
  {
    id: "role-manager",
    name: "Outlet Manager",
    description: "Manages a single outlet: staff, inventory, promotions and reporting.",
    userCount: 8,
    permissions: buildPermissions("manager"),
  },
  {
    id: "role-cashier",
    name: "Cashier",
    description: "Front-of-house access limited to transactions and product lookup.",
    userCount: 34,
    permissions: buildPermissions("cashier"),
  },
];

export const categories: Category[] = [
  { id: "cat-01", name: "Kopi & Minuman", productCount: 142, color: "chart-1" },
  { id: "cat-02", name: "Makanan Berat", productCount: 98, color: "chart-2" },
  { id: "cat-03", name: "Pastry & Roti", productCount: 76, color: "chart-3" },
  { id: "cat-04", name: "Dessert", productCount: 54, color: "chart-4" },
  { id: "cat-05", name: "Merchandise", productCount: 31, color: "chart-5" },
  { id: "cat-06", name: "Camilan", productCount: 63, color: "chart-6" },
  { id: "cat-07", name: "Paket Sarapan", productCount: 28, color: "chart-7" },
  { id: "cat-08", name: "Lainnya", productCount: 19, color: "chart-8" },
];

export const products: Product[] = [
  { id: "prd-01", sku: "KSG-001", name: "Kopi Susu Gula Aren", category: "Kopi & Minuman", price: 22_000, cost: 9_500, stock: 340, status: "active", outlet: "Kemang" },
  { id: "prd-02", sku: "AMR-002", name: "Americano Dingin", category: "Kopi & Minuman", price: 20_000, cost: 8_000, stock: 210, status: "active", outlet: "Senopati" },
  { id: "prd-03", sku: "NGL-003", name: "Es Kopi Nangka Latte", category: "Kopi & Minuman", price: 26_000, cost: 11_200, stock: 18, status: "low-stock", outlet: "PIK Avenue" },
  { id: "prd-04", sku: "NAS-010", name: "Nasi Ayam Geprek Sambal Matah", category: "Makanan Berat", price: 32_000, cost: 15_000, stock: 76, status: "active", outlet: "Kelapa Gading" },
  { id: "prd-05", sku: "MIE-011", name: "Mie Goreng Jawa Komplit", category: "Makanan Berat", price: 28_000, cost: 12_500, stock: 0, status: "out-of-stock", outlet: "Bintaro" },
  { id: "prd-06", sku: "CRO-020", name: "Croissant Coklat", category: "Pastry & Roti", price: 18_000, cost: 7_200, stock: 54, status: "active", outlet: "BSD City" },
  { id: "prd-07", sku: "DNT-021", name: "Donat Kentang Gula Halus", category: "Pastry & Roti", price: 12_000, cost: 4_500, stock: 120, status: "active", outlet: "Dago" },
  { id: "prd-08", sku: "TIR-030", name: "Tiramisu Cup", category: "Dessert", price: 24_000, cost: 10_800, stock: 9, status: "low-stock", outlet: "Malioboro" },
  { id: "prd-09", sku: "TUM-031", name: "Es Krim Tumpeng Mini", category: "Dessert", price: 19_000, cost: 8_100, stock: 64, status: "active", outlet: "Kemang" },
  { id: "prd-10", sku: "TBL-040", name: "Tote Bag Kanvas Logo", category: "Merchandise", price: 65_000, cost: 32_000, stock: 22, status: "active", outlet: "Senopati" },
  { id: "prd-11", sku: "MUG-041", name: "Mug Keramik Edisi Terbatas", category: "Merchandise", price: 85_000, cost: 41_000, stock: 15, status: "active", outlet: "PIK Avenue" },
  { id: "prd-12", sku: "KRP-050", name: "Keripik Singkong Balado", category: "Camilan", price: 15_000, cost: 6_000, stock: 88, status: "active", outlet: "Kelapa Gading" },
];

export const promotions: Promotion[] = [
  {
    id: "promo-01",
    name: "Diskon Jam Ngantuk 20%",
    type: "percentage",
    rule: "Diskon 20% untuk kategori Kopi & Minuman, pukul 13.00–15.00",
    scope: "Kopi & Minuman",
    outletScope: "Semua Outlet",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    status: "active",
    redemptions: 3_412,
  },
  {
    id: "promo-02",
    name: "Beli 1 Gratis 1 — Croissant",
    type: "bogo",
    rule: "Beli 1 Croissant Coklat, gratis 1 Croissant Original",
    scope: "Croissant Coklat, Croissant Original",
    outletScope: "Kemang, Senopati, PIK Avenue",
    startDate: "2026-09-15",
    endDate: "2026-09-30",
    status: "active",
    redemptions: 986,
  },
  {
    id: "promo-03",
    name: "Potongan Rp10.000 Min. Belanja Rp75rb",
    type: "fixed",
    rule: "Potongan Rp10.000 untuk transaksi minimum Rp75.000",
    scope: "Semua Produk",
    outletScope: "Semua Outlet",
    startDate: "2026-10-01",
    endDate: "2026-10-15",
    status: "scheduled",
    redemptions: 0,
  },
  {
    id: "promo-04",
    name: "Promo 17-an Kemerdekaan",
    type: "percentage",
    rule: "Diskon 17% untuk semua transaksi",
    scope: "Semua Produk",
    outletScope: "Semua Outlet",
    startDate: "2026-08-14",
    endDate: "2026-08-17",
    status: "expired",
    redemptions: 5_204,
  },
  {
    id: "promo-05",
    name: "Bundling Sarapan Hemat",
    type: "fixed",
    rule: "Paket Nasi + Kopi Susu seharga Rp35.000 (hemat Rp9.000)",
    scope: "Paket Sarapan",
    outletScope: "Bintaro, BSD City",
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    status: "draft",
    redemptions: 0,
  },
];

const outletNames = outlets.map((o) => o.name);
const cashierNames = ["Rina Kusuma", "Fajar Nugraha", "Yusuf Hidayat", "Putri Wulandari", "Andika Saputra", "Melati Sari", "Dimas Aditya", "Citra Lestari"];
const paymentMethods: Transaction["paymentMethod"][] = ["QRIS", "Cash", "Debit", "E-Wallet", "Credit Card", "Split Payment"];
const txStatuses: Transaction["status"][] = ["completed", "completed", "completed", "completed", "refunded", "voided", "pending"];

export const transactions: Transaction[] = Array.from({ length: 24 }).map((_, i) => {
  const outlet = outletNames[i % outletNames.length];
  const cashier = cashierNames[i % cashierNames.length];
  const method = paymentMethods[i % paymentMethods.length];
  const status = txStatuses[i % txStatuses.length];
  const total = 24_000 + ((i * 4173) % 260_000);
  const day = 25 - Math.floor(i / 2);
  const hour = 8 + (i % 12);
  return {
    id: `TRX-2026-${String(90210 - i).padStart(6, "0")}`,
    outlet,
    cashier,
    paymentMethod: method,
    total,
    itemCount: 1 + (i % 5),
    status,
    createdAt: `2026-09-${String(Math.max(day, 1)).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00`,
  };
});

export const inventoryItems: InventoryItem[] = [
  { id: "inv-01", productName: "Kopi Susu Gula Aren", sku: "KSG-001", outlet: "Kemang", currentStock: 340, reservedStock: 20, minimumStock: 80, unit: "cup", stockValue: 3_230_000, status: "healthy" },
  { id: "inv-02", productName: "Es Kopi Nangka Latte", sku: "NGL-003", outlet: "PIK Avenue", currentStock: 18, reservedStock: 4, minimumStock: 40, unit: "cup", stockValue: 201_600, status: "low" },
  { id: "inv-03", productName: "Mie Goreng Jawa Komplit", sku: "MIE-011", outlet: "Bintaro", currentStock: 0, reservedStock: 0, minimumStock: 30, unit: "porsi", stockValue: 0, status: "out-of-stock" },
  { id: "inv-04", productName: "Croissant Coklat", sku: "CRO-020", outlet: "BSD City", currentStock: 54, reservedStock: 6, minimumStock: 25, unit: "pcs", stockValue: 388_800, status: "healthy" },
  { id: "inv-05", productName: "Tiramisu Cup", sku: "TIR-030", outlet: "Malioboro", currentStock: 9, reservedStock: 2, minimumStock: 20, unit: "cup", stockValue: 97_200, status: "low" },
  { id: "inv-06", productName: "Susu UHT Full Cream 1L", sku: "RAW-100", outlet: "Kemang", currentStock: 64, reservedStock: 0, minimumStock: 20, unit: "liter", stockValue: 1_216_000, status: "healthy" },
  { id: "inv-07", productName: "Biji Kopi Arabika Gayo 1kg", sku: "RAW-101", outlet: "Senopati", currentStock: 12, reservedStock: 2, minimumStock: 15, unit: "kg", stockValue: 2_160_000, status: "low" },
  { id: "inv-08", productName: "Gula Aren Cair 1L", sku: "RAW-102", outlet: "PIK Avenue", currentStock: 0, reservedStock: 0, minimumStock: 10, unit: "liter", stockValue: 0, status: "out-of-stock" },
  { id: "inv-09", productName: "Cup Plastik 16oz", sku: "PKG-200", outlet: "Kelapa Gading", currentStock: 2_400, reservedStock: 0, minimumStock: 500, unit: "pcs", stockValue: 1_200_000, status: "healthy" },
];

export const suppliers: Supplier[] = [
  { id: "sup-01", name: "CV Gayo Coffee Indonesia", contactPerson: "Muhammad Fadli", phone: "0651-334221", email: "sales@gayocoffee.id", category: "Biji Kopi", outstandingPO: 4, status: "active" },
  { id: "sup-02", name: "PT Sinar Susu Nusantara", contactPerson: "Linda Kartika", phone: "021-8834521", email: "order@sinarsusu.co.id", category: "Dairy", outstandingPO: 1, status: "active" },
  { id: "sup-03", name: "UD Gula Aren Banyumas", contactPerson: "Slamet Riyadi", phone: "0281-772341", email: "gulaaren.banyumas@gmail.com", category: "Bahan Baku", outstandingPO: 0, status: "active" },
  { id: "sup-04", name: "PT Kemasan Jaya Abadi", contactPerson: "Vina Anggraeni", phone: "021-4471029", email: "vina@kemasanjaya.co.id", category: "Kemasan", outstandingPO: 2, status: "active" },
  { id: "sup-05", name: "CV Roti Makmur Sentosa", contactPerson: "Herman Wijaya", phone: "022-6019284", email: "herman@rotimakmur.id", category: "Roti & Pastry", outstandingPO: 0, status: "inactive" },
];

export const auditLogs: AuditLogEntry[] = [
  { id: "log-01", user: "Nadia Permata", action: "Updated", module: "Promotions", data: "Diskon Jam Ngantuk 20% — extended end date", timestamp: "2026-09-25T08:40:00" },
  { id: "log-02", user: "Dewi Anggraini", action: "Approved", module: "Inventory", data: "Stock opname #SO-0231 — Kemang", timestamp: "2026-09-25T08:10:00" },
  { id: "log-03", user: "Bagus Prasetyo", action: "Created", module: "Users", data: "New cashier account — Melati Sari", timestamp: "2026-09-24T17:22:00" },
  { id: "log-04", user: "Nadia Permata", action: "Deleted", module: "Products", data: "Removed SKU DSC-099 (discontinued)", timestamp: "2026-09-24T15:05:00" },
  { id: "log-05", user: "Siti Rahmawati", action: "Refunded", module: "Transactions", data: "TRX-2026-090180 — Rp45.000", timestamp: "2026-09-24T13:48:00" },
  { id: "log-06", user: "System", action: "Alert", module: "Sync", data: "Failed to sync 3 transactions — PIK Avenue (offline mode)", timestamp: "2026-09-24T11:02:00" },
  { id: "log-07", user: "Agus Setiawan", action: "Updated", module: "Outlets", data: "Changed manager contact number — Kelapa Gading", timestamp: "2026-09-23T16:30:00" },
  { id: "log-08", user: "Nadia Permata", action: "Exported", module: "Reports", data: "Sales report September 2026 (PDF)", timestamp: "2026-09-23T09:15:00" },
];

export const notifications: NotificationItem[] = [
  { id: "ntf-01", kind: "low-stock", title: "Stok menipis — Es Kopi Nangka Latte", description: "Sisa 18 cup di outlet PIK Avenue, di bawah minimum 40 cup.", timestamp: "2026-09-25T08:05:00", read: false, outlet: "PIK Avenue" },
  { id: "ntf-02", kind: "out-of-stock", title: "Stok habis — Mie Goreng Jawa Komplit", description: "Produk kehabisan stok di outlet Bintaro sejak pukul 07.40.", timestamp: "2026-09-25T07:41:00", read: false, outlet: "Bintaro" },
  { id: "ntf-03", kind: "refund-request", title: "Permintaan refund menunggu persetujuan", description: "TRX-2026-090180 senilai Rp45.000 diajukan oleh Siti Rahmawati.", timestamp: "2026-09-24T13:50:00", read: false, outlet: "PIK Avenue" },
  { id: "ntf-04", kind: "stock-opname", title: "Stock opname menunggu persetujuan", description: "SO-0231 — Kemang, selisih 4 item, menunggu approval Anda.", timestamp: "2026-09-24T09:12:00", read: true, outlet: "Kemang" },
  { id: "ntf-05", kind: "sync-failed", title: "Sinkronisasi gagal", description: "3 transaksi offline belum tersinkron di outlet PIK Avenue.", timestamp: "2026-09-24T11:02:00", read: true, outlet: "PIK Avenue" },
  { id: "ntf-06", kind: "system", title: "Pemeliharaan sistem terjadwal", description: "Sistem akan menjalani maintenance pada 28 Sep 2026, pukul 01.00–03.00 WIB.", timestamp: "2026-09-23T18:00:00", read: true },
];
