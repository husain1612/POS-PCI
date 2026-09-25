import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { LineChart } from "@/components/charts/LineChart";
import { BarList } from "@/components/charts/BarList";
import { DownloadIcon } from "@/components/icons";
import {
  INVENTORY,
  PRODUCTS,
  REVENUE_TREND,
  SALES_BY_PAYMENT,
  TOP_PRODUCTS,
} from "@/lib/mock-data";
import { STOCK_STATUS_LABEL, STOCK_STATUS_VARIANT } from "@/lib/labels";
import { formatIDR, formatNumber } from "@/lib/utils";

function ReportToolbar() {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <p className="text-sm text-ink-muted">Periode: 19 Sep – 25 Sep 2026</p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          <DownloadIcon width={15} height={15} />
          Export CSV
        </Button>
        <Button variant="outline" size="sm">
          <DownloadIcon width={15} height={15} />
          Export PDF
        </Button>
      </div>
    </div>
  );
}

function SalesReport() {
  const totalRevenue = REVENUE_TREND.reduce((s, d) => s + d.value, 0);
  return (
    <div>
      <ReportToolbar />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tren Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={REVENUE_TREND} />
            <p className="mt-3 text-sm text-ink-muted">
              Total revenue periode ini: <span className="font-semibold text-ink">{formatIDR(totalRevenue)}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Penjualan per Metode Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <BarList
              items={SALES_BY_PAYMENT.map((p) => ({ label: p.method, value: p.value, displayValue: formatIDR(p.value), color: p.color }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProductReport() {
  return (
    <div>
      <ReportToolbar />
      <Card>
        <CardHeader>
          <CardTitle>Performa Produk</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Unit Terjual</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Harga Rata-rata</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TOP_PRODUCTS.map((p) => {
              const product = PRODUCTS.find((prod) => prod.name === p.name);
              return (
                <TableRow key={p.name}>
                  <TableCell className="font-medium text-ink">{p.name}</TableCell>
                  <TableCell className="text-ink-muted">{product?.category ?? "-"}</TableCell>
                  <TableCell className="text-right text-ink-muted">{formatNumber(p.qty)}</TableCell>
                  <TableCell className="text-right font-medium text-ink">{formatIDR(p.revenue)}</TableCell>
                  <TableCell className="text-right text-ink-muted">{formatIDR(Math.round(p.revenue / p.qty))}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function InventoryReport() {
  const totalValue = INVENTORY.reduce((sum, i) => sum + i.currentStock * i.avgCost, 0);
  return (
    <div>
      <ReportToolbar />
      <Card className="mb-4">
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-ink-muted">Total Nilai Persediaan Saat Ini</p>
            <p className="text-xl font-semibold text-ink">{formatIDR(totalValue)}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-success-600 font-medium">{INVENTORY.filter((i) => i.status === "healthy").length} Aman</span>
            <span className="text-warning-600 font-medium">{INVENTORY.filter((i) => i.status === "low").length} Menipis</span>
            <span className="text-error-600 font-medium">{INVENTORY.filter((i) => i.status === "out_of_stock").length} Habis</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Detail Persediaan</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead className="text-right">Stok</TableHead>
              <TableHead className="text-right">Biaya Rata-rata</TableHead>
              <TableHead className="text-right">Nilai Stok</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVENTORY.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-ink">{item.productName}</TableCell>
                <TableCell className="text-right text-ink-muted">{item.currentStock} {item.unit}</TableCell>
                <TableCell className="text-right text-ink-muted">{formatIDR(item.avgCost)}</TableCell>
                <TableCell className="text-right font-medium text-ink">{formatIDR(item.currentStock * item.avgCost)}</TableCell>
                <TableCell>
                  <Badge variant={STOCK_STATUS_VARIANT[item.status]} dot>
                    {STOCK_STATUS_LABEL[item.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Laporan penjualan, produk, dan inventory outlet." />
      <Tabs
        items={[
          { key: "sales", label: "Sales Report", content: <SalesReport /> },
          { key: "product", label: "Product Report", content: <ProductReport /> },
          { key: "inventory", label: "Inventory Report", content: <InventoryReport /> },
        ]}
      />
    </div>
  );
}
