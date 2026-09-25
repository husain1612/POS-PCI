import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { SearchIcon } from "@/components/icons";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";
import { formatIDR, formatNumber } from "@/lib/utils";

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Products"
        description="Katalog produk yang tersedia di outlet ini — dikelola secara terpusat di Web Admin."
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border-subtle px-5 py-3.5">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input placeholder="Cari nama produk atau SKU..." className="pl-9" />
          </div>
          <Select defaultValue="all" className="w-auto min-w-[160px]">
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Harga Jual</TableHead>
              <TableHead className="text-right">Stok Outlet</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCTS.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[10px] font-semibold text-white"
                      style={{ backgroundColor: p.imageColor }}
                    >
                      {p.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-ink-muted">{p.sku}</TableCell>
                <TableCell className="text-ink-muted">{p.category}</TableCell>
                <TableCell className="text-right font-medium text-ink">{formatIDR(p.price)}</TableCell>
                <TableCell className="text-right text-ink-muted">{formatNumber(p.stock)}</TableCell>
                <TableCell className="text-ink-muted">{p.unit}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "active" ? "success" : "neutral"} dot>
                    {p.status === "active" ? "Aktif" : "Nonaktif"}
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
