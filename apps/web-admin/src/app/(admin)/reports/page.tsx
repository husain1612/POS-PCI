import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { BarListChart } from "@/components/ui/charts/BarListChart";
import { revenueByOutlet, revenueByCategory, inventoryItems, outlets } from "@/lib/mock-data";
import { formatIDR, formatIDRCompact, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Sales and inventory performance, exportable as CSV or PDF."
        action={
          <>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4" />
              CSV
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="pt-5">
          <Tabs
            items={[
              { key: "sales", label: "Sales Report", content: <SalesReport /> },
              { key: "inventory", label: "Inventory Report", content: <InventoryReport /> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function SalesReport() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-[13px] font-medium text-ink-secondary">Sales by Outlet</p>
        <BarListChart data={revenueByOutlet.map((o) => ({ label: o.outlet, value: o.value }))} formatValue={formatIDRCompact} />
      </div>
      <div>
        <p className="mb-3 text-[13px] font-medium text-ink-secondary">Sales by Category</p>
        <BarListChart data={revenueByCategory.map((c) => ({ label: c.category, value: c.value }))} formatValue={formatIDRCompact} />
      </div>
      <div className="lg:col-span-2">
        <Table>
          <THead>
            <Tr>
              <Th>Outlet</Th>
              <Th>Net Sales</Th>
              <Th>Gross Profit</Th>
              <Th>Margin</Th>
            </Tr>
          </THead>
          <TBody>
            {outlets.map((o) => {
              const grossProfit = Math.round(o.revenueThisMonth * 0.34);
              const margin = o.revenueThisMonth > 0 ? (grossProfit / o.revenueThisMonth) * 100 : 0;
              return (
                <Tr key={o.id}>
                  <Td className="font-medium">{o.name}</Td>
                  <Td className="tabular-nums">{formatIDR(o.revenueThisMonth)}</Td>
                  <Td className="tabular-nums">{formatIDR(grossProfit)}</Td>
                  <Td className="tabular-nums text-ink-secondary">{margin.toFixed(1)}%</Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </div>
    </div>
  );
}

function InventoryReport() {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>Product</Th>
          <Th>Outlet</Th>
          <Th>Current Stock</Th>
          <Th>Minimum</Th>
          <Th>Stock Value</Th>
          <Th>Status</Th>
        </Tr>
      </THead>
      <TBody>
        {inventoryItems.map((item) => (
          <Tr key={item.id}>
            <Td className="font-medium">{item.productName}</Td>
            <Td className="text-ink-secondary">{item.outlet}</Td>
            <Td className="tabular-nums">
              {formatNumber(item.currentStock)} {item.unit}
            </Td>
            <Td className="tabular-nums text-ink-secondary">{formatNumber(item.minimumStock)}</Td>
            <Td className="tabular-nums">{formatIDR(item.stockValue)}</Td>
            <Td>
              <StatusBadge status={item.status} />
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
