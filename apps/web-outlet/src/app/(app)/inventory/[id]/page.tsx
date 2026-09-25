import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ChevronLeftIcon, StockInIcon, StockOutIcon } from "@/components/icons";
import { INVENTORY } from "@/lib/mock-data";
import { STOCK_STATUS_LABEL, STOCK_STATUS_VARIANT } from "@/lib/labels";
import { formatDate, formatIDR, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return INVENTORY.map((i) => ({ id: i.id }));
}

const MOVEMENTS = [
  { date: "2026-09-25T07:30:00", type: "Stock Opname", qty: 0, note: "Perhitungan fisik rutin" },
  { date: "2026-09-23T09:10:00", type: "Stock Out", qty: -18, note: "Penjualan harian" },
  { date: "2026-09-20T14:20:00", type: "Stock In", qty: 50, note: "Penerimaan dari CV Berkah Kopi Nusantara" },
  { date: "2026-09-15T10:00:00", type: "Stock Out", qty: -22, note: "Penjualan harian" },
];

export default function InventoryDetailPage({ params }: { params: { id: string } }) {
  const item = INVENTORY.find((i) => i.id === params.id);
  if (!item) notFound();

  const available = item.currentStock - item.reservedStock;
  const stockValue = item.currentStock * item.avgCost;

  return (
    <div>
      <Link href="/inventory" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink">
        <ChevronLeftIcon width={15} height={15} />
        Kembali ke Inventory
      </Link>

      <PageHeader
        title={item.productName}
        description={`SKU ${item.sku} · ${item.category}`}
        actions={
          <>
            <Link href="/stock-in">
              <Button variant="secondary" size="sm">
                <StockInIcon width={15} height={15} />
                Stock In
              </Button>
            </Link>
            <Link href="/stock-out">
              <Button variant="outline" size="sm">
                <StockOutIcon width={15} height={15} />
                Stock Out
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricBox label="Current Stock" value={`${formatNumber(item.currentStock)} ${item.unit}`} />
        <MetricBox label="Reserved Stock" value={`${formatNumber(item.reservedStock)} ${item.unit}`} />
        <MetricBox label="Available Stock" value={`${formatNumber(available)} ${item.unit}`} highlight />
        <MetricBox label="Minimum Stock" value={`${formatNumber(item.minStock)} ${item.unit}`} />
        <MetricBox label="Stock Value" value={formatIDR(stockValue)} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Riwayat Pergerakan Stok</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Perubahan</TableHead>
                <TableHead>Catatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOVEMENTS.map((m, i) => (
                <TableRow key={i}>
                  <TableCell className="text-ink-muted">{formatDate(m.date)}</TableCell>
                  <TableCell className="font-medium text-ink">{m.type}</TableCell>
                  <TableCell className={`text-right font-medium ${m.qty > 0 ? "text-success-600" : m.qty < 0 ? "text-error-600" : "text-ink-muted"}`}>
                    {m.qty > 0 ? `+${m.qty}` : m.qty}
                  </TableCell>
                  <TableCell className="text-ink-muted">{m.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detail Produk</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5 text-sm">
            <Row label="Kategori" value={item.category} />
            <Row label="Satuan" value={item.unit} />
            <Row label="Rata-rata Biaya" value={formatIDR(item.avgCost)} />
            <Row label="Pergerakan Terakhir" value={formatDate(item.lastMovement)} />
            <div className="pt-1">
              <Badge variant={STOCK_STATUS_VARIANT[item.status]} dot>
                {STOCK_STATUS_LABEL[item.status]}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-brand-200 bg-brand-50" : "border-border bg-surface-raised"}`}>
      <p className={`text-xs font-medium ${highlight ? "text-brand-700" : "text-ink-muted"}`}>{label}</p>
      <p className={`mt-2 text-lg font-semibold ${highlight ? "text-brand-800" : "text-ink"}`}>{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
