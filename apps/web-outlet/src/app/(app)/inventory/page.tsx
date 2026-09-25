import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { InventoryIcon, PackageXIcon, SearchIcon } from "@/components/icons";
import { CATEGORIES, INVENTORY } from "@/lib/mock-data";
import { STOCK_STATUS_LABEL, STOCK_STATUS_VARIANT } from "@/lib/labels";
import { formatIDR, formatNumber } from "@/lib/utils";

export default function InventoryPage() {
  const totalValue = INVENTORY.reduce((sum, i) => sum + i.currentStock * i.avgCost, 0);
  const lowCount = INVENTORY.filter((i) => i.status === "low").length;
  const outCount = INVENTORY.filter((i) => i.status === "out_of_stock").length;

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Pantau stok saat ini, stok tersedia, dan nilai persediaan outlet."
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total SKU" value={formatNumber(INVENTORY.length)} icon={<InventoryIcon width={16} height={16} />} />
        <StatCard label="Nilai Persediaan" value={formatIDR(totalValue)} />
        <StatCard label="Stok Menipis" value={`${lowCount} SKU`} tone="warning" icon={<PackageXIcon width={16} height={16} />} />
        <StatCard label="Stok Habis" value={`${outCount} SKU`} tone="warning" />
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border-subtle px-5 py-3.5">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input placeholder="Cari produk atau SKU..." className="pl-9" />
          </div>
          <Select defaultValue="all" className="w-auto min-w-[160px]">
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Select defaultValue="all" className="w-auto min-w-[160px]">
            <option value="all">Semua Status</option>
            <option value="healthy">Aman</option>
            <option value="low">Menipis</option>
            <option value="out_of_stock">Habis</option>
            <option value="overstock">Berlebih</option>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Stok Saat Ini</TableHead>
              <TableHead className="text-right">Stok Ditahan</TableHead>
              <TableHead className="text-right">Stok Tersedia</TableHead>
              <TableHead className="text-right">Min. Stok</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVENTORY.map((item) => {
              const available = item.currentStock - item.reservedStock;
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-ink">{item.productName}</TableCell>
                  <TableCell className="text-ink-muted">{item.sku}</TableCell>
                  <TableCell className="text-right text-ink">{formatNumber(item.currentStock)} {item.unit}</TableCell>
                  <TableCell className="text-right text-ink-muted">{formatNumber(item.reservedStock)}</TableCell>
                  <TableCell className="text-right font-medium text-ink">{formatNumber(available)}</TableCell>
                  <TableCell className="text-right text-ink-muted">{formatNumber(item.minStock)}</TableCell>
                  <TableCell>
                    <Badge variant={STOCK_STATUS_VARIANT[item.status]} dot>
                      {STOCK_STATUS_LABEL[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/inventory/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
