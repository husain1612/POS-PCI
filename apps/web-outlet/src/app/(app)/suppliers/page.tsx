import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { SUPPLIERS } from "@/lib/mock-data";

export default function SuppliersPage() {
  return (
    <div>
      <PageHeader
        title="Suppliers"
        description="Daftar pemasok bahan baku dan produk untuk outlet ini."
        actions={
          <Button size="sm">
            <PlusIcon width={15} height={15} />
            Tambah Supplier
          </Button>
        }
      />

      <Card>
        <div className="flex items-center gap-2.5 border-b border-border-subtle px-5 py-3.5">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input placeholder="Cari nama supplier..." className="pl-9" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Supplier</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Produk Dipasok</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPLIERS.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <p className="font-medium text-ink">{s.name}</p>
                  <p className="text-xs text-ink-faint">{s.address}</p>
                </TableCell>
                <TableCell className="text-ink-muted">{s.contactPerson}</TableCell>
                <TableCell className="text-ink-muted">{s.phone}</TableCell>
                <TableCell className="text-ink-muted">{s.email}</TableCell>
                <TableCell className="text-right text-ink-muted">{s.productsSupplied} produk</TableCell>
                <TableCell>
                  <Badge variant={s.status === "active" ? "success" : "neutral"} dot>
                    {s.status === "active" ? "Aktif" : "Nonaktif"}
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
