import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LineChart } from "@/components/charts/LineChart";
import { BarList, RankedList } from "@/components/charts/BarList";
import { DownloadIcon, PackageXIcon, ReceiptIcon } from "@/components/icons";
import {
  DASHBOARD_STATS,
  FAST_MOVING,
  REVENUE_TREND,
  SALES_BY_PAYMENT,
  SLOW_MOVING,
  TOP_CATEGORIES,
  TOP_PRODUCTS,
} from "@/lib/mock-data";
import { formatIDR, formatIDRCompact, formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan performa outlet Kopi Nusantara - Kemang hari ini."
        actions={
          <Button variant="secondary" size="sm">
            <DownloadIcon width={15} height={15} />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Revenue"
          value={formatIDR(DASHBOARD_STATS.revenue)}
          delta={DASHBOARD_STATS.revenueDelta}
          deltaLabel="vs kemarin"
          icon={<ReceiptIcon width={16} height={16} />}
        />
        <StatCard
          label="Transactions"
          value={formatNumber(DASHBOARD_STATS.transactions)}
          delta={DASHBOARD_STATS.transactionsDelta}
          deltaLabel="vs kemarin"
        />
        <StatCard
          label="Average Basket"
          value={formatIDR(DASHBOARD_STATS.avgBasket)}
          delta={DASHBOARD_STATS.avgBasketDelta}
          deltaLabel="vs kemarin"
        />
        <StatCard
          label="Gross Profit"
          value={formatIDR(DASHBOARD_STATS.grossProfit)}
          delta={DASHBOARD_STATS.grossProfitDelta}
          deltaLabel="vs kemarin"
        />
        <StatCard
          label="Low Stock"
          value={`${DASHBOARD_STATS.lowStockCount} Produk`}
          tone="warning"
          icon={<PackageXIcon width={16} height={16} />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>7 hari terakhir</CardDescription>
            </div>
            <Badge variant="success" dot>
              {formatIDRCompact(DASHBOARD_STATS.revenue)} hari ini
            </Badge>
          </CardHeader>
          <CardContent>
            <LineChart data={REVENUE_TREND} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Sales by Payment Method</CardTitle>
              <CardDescription>Kontribusi metode pembayaran</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <BarList
              items={SALES_BY_PAYMENT.map((p) => ({
                label: p.method,
                value: p.value,
                displayValue: formatIDRCompact(p.value),
                color: p.color,
              }))}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Berdasarkan unit terjual, 7 hari terakhir</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <RankedList
              items={TOP_PRODUCTS.map((p, i) => ({
                rank: i + 1,
                name: p.name,
                primary: `${formatNumber(p.qty)} terjual`,
                secondary: formatIDR(p.revenue),
              }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top Categories</CardTitle>
              <CardDescription>Kontribusi terhadap total revenue</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <BarList
              items={TOP_CATEGORIES.map((c) => ({
                label: c.name,
                value: c.share,
                displayValue: `${c.share}% · ${formatIDRCompact(c.revenue)}`,
              }))}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Fast Moving Products</CardTitle>
              <CardDescription>Unit terjual rata-rata per hari</CardDescription>
            </div>
            <Badge variant="success">Perputaran tinggi</Badge>
          </CardHeader>
          <CardContent>
            <RankedList
              items={FAST_MOVING.map((p, i) => ({
                rank: i + 1,
                name: p.name,
                primary: `${p.unitsPerDay.toFixed(1)} / hari`,
              }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Slow Moving Products</CardTitle>
              <CardDescription>Kandidat evaluasi stok berlebih</CardDescription>
            </div>
            <Badge variant="warning">Perhatian</Badge>
          </CardHeader>
          <CardContent>
            <RankedList
              items={SLOW_MOVING.map((p, i) => ({
                rank: i + 1,
                name: p.name,
                primary: `${p.unitsPerDay.toFixed(1)} / hari`,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
