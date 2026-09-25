import type { Metadata } from "next";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { inventoryItems, outlets } from "@/lib/mock-data";
import { formatIDR, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Inventory Monitoring" };

export default function InventoryPage() {
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.stockValue, 0);
  const lowCount = inventoryItems.filter((i) => i.status === "low").length;
  const outCount = inventoryItems.filter((i) => i.status === "out-of-stock").length;

  return (
    <div>
      <PageHeader
        title="Inventory Monitoring"
        description="Stock levels across all outlets and warehouses."
        action={
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-[13px] font-medium text-ink-secondary">Total Stock Value</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-ink-primary">{formatIDR(totalValue)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] font-medium text-ink-secondary">Low Stock Items</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-warning">{lowCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] font-medium text-ink-secondary">Out of Stock Items</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-danger">{outCount}</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="w-64">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search product or SKU…" />
          </div>
          <Select className="w-44" defaultValue="">
            <option value="">All outlets</option>
            {outlets.map((o) => (
              <option key={o.id}>{o.name}</option>
            ))}
          </Select>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>Product</Th>
              <Th>SKU</Th>
              <Th>Outlet</Th>
              <Th>Current Stock</Th>
              <Th>Reserved</Th>
              <Th>Available</Th>
              <Th>Minimum</Th>
              <Th>Stock Value</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {inventoryItems.map((item) => (
              <Tr key={item.id}>
                <Td className="font-medium">{item.productName}</Td>
                <Td className="text-ink-secondary">{item.sku}</Td>
                <Td className="text-ink-secondary">{item.outlet}</Td>
                <Td className="tabular-nums">
                  {formatNumber(item.currentStock)} {item.unit}
                </Td>
                <Td className="tabular-nums">{formatNumber(item.reservedStock)}</Td>
                <Td className="tabular-nums">{formatNumber(item.currentStock - item.reservedStock)}</Td>
                <Td className="tabular-nums text-ink-secondary">{formatNumber(item.minimumStock)}</Td>
                <Td className="tabular-nums">{formatIDR(item.stockValue)}</Td>
                <Td>
                  <StatusBadge status={item.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
