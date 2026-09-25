import type { Metadata } from "next";
import { DollarSign, Package, Receipt, Store, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { LineChart } from "@/components/ui/charts/LineChart";
import { BarListChart } from "@/components/ui/charts/BarListChart";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import { MiniBar } from "@/components/ui/MiniBar";
import { CHART_BG } from "@/components/ui/charts/chart-colors";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import {
  dashboardStats,
  revenueTrend,
  revenueByOutlet,
  revenueByCategory,
  paymentDistribution,
  outletComparison,
} from "@/lib/mock-data";
import { formatIDR, formatIDRCompact, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const maxRevenue = Math.max(...outletComparison.map((o) => o.revenue));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan performa seluruh organisasi hari ini, 25 September 2026."
        action={
          <>
            <Button variant="secondary" size="sm">
              Last 30 days
            </Button>
            <Button size="sm">Export report</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Revenue"
          value={formatIDRCompact(dashboardStats.totalRevenue)}
          delta={dashboardStats.totalRevenueDelta}
          deltaLabel="vs last month"
          icon={DollarSign}
          accent="chart-1"
        />
        <StatCard
          label="Active Outlets"
          value={String(dashboardStats.activeOutlets)}
          delta={dashboardStats.activeOutletsDelta}
          deltaLabel="new this month"
          icon={Store}
          accent="chart-3"
        />
        <StatCard
          label="Active Users"
          value={String(dashboardStats.activeUsers)}
          delta={dashboardStats.activeUsersDelta}
          deltaLabel="vs last month"
          icon={Users}
          accent="chart-7"
        />
        <StatCard
          label="Transactions"
          value={formatNumber(dashboardStats.transactions)}
          delta={dashboardStats.transactionsDelta}
          deltaLabel="vs last month"
          icon={Receipt}
          accent="chart-2"
        />
        <StatCard
          label="Product Count"
          value={formatNumber(dashboardStats.productCount)}
          delta={dashboardStats.productCountDelta}
          deltaLabel="vs last month"
          icon={Package}
          accent="chart-4"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue Trend" description="Total revenue across all outlets, last 25 days" />
          <CardContent>
            <LineChart data={revenueTrend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Payment Distribution" description="Share of transactions by payment method" />
          <CardContent>
            <DonutChart data={paymentDistribution.map((p) => ({ label: p.method, value: p.value }))} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Revenue by Outlet" description="Top performing outlets this month" />
          <CardContent>
            <BarListChart data={revenueByOutlet.map((o) => ({ label: o.outlet, value: o.value }))} formatValue={formatIDRCompact} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Revenue by Category" description="Contribution per product category" />
          <CardContent>
            <BarListChart
              data={revenueByCategory.map((c) => ({ label: c.category, value: c.value }))}
              formatValue={formatIDRCompact}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Outlet Comparison" description="Revenue, transactions and average basket per outlet" />
        <Table>
          <THead>
            <Tr>
              <Th>Outlet</Th>
              <Th>Revenue</Th>
              <Th className="w-40">Share</Th>
              <Th>Transactions</Th>
              <Th>Avg. Basket</Th>
            </Tr>
          </THead>
          <TBody>
            {outletComparison.map((row, i) => (
              <Tr key={row.outlet}>
                <Td className="font-medium">{row.outlet}</Td>
                <Td className="tabular-nums">{formatIDR(row.revenue)}</Td>
                <Td>
                  <MiniBar value={row.revenue} max={maxRevenue} colorClassName={CHART_BG[i % CHART_BG.length]} />
                </Td>
                <Td className="tabular-nums">{formatNumber(row.transactions)}</Td>
                <Td className="tabular-nums">{formatIDR(row.avgBasket)}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
