import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StockMovementForm } from "@/components/forms/StockMovementForm";
import { formatIDR } from "@/lib/utils";

const RECENT_STOCK_IN = [
  { id: "si1", ref: "PO-2026-0090", date: "24 Sep 2026", supplier: "CV Berkah Kopi Nusantara", items: 3, value: 5850000, status: "Diterima" },
  { id: "si2", ref: "PO-2026-0089", date: "22 Sep 2026", supplier: "PT Susu Segar Indonesia", items: 2, value: 2100000, status: "Diterima" },
  { id: "si3", ref: "PO-2026-0088", date: "19 Sep 2026", supplier: "UD Gula Aren Asli Lampung", items: 1, value: 1350000, status: "Diterima" },
];

export default function StockInPage() {
  return (
    <div>
      <PageHeader title="Stock In" description="Catat penerimaan barang masuk ke inventory outlet, opsional dari supplier." />

      <div className="mb-6">
        <StockMovementForm mode="in" />
      </div>

      <Card>
        <div className="border-b border-border-subtle px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ink">Riwayat Stock In Terbaru</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referensi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Jumlah Item</TableHead>
              <TableHead className="text-right">Nilai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_STOCK_IN.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-ink">{row.ref}</TableCell>
                <TableCell className="text-ink-muted">{row.date}</TableCell>
                <TableCell className="text-ink-muted">{row.supplier}</TableCell>
                <TableCell className="text-right text-ink-muted">{row.items} SKU</TableCell>
                <TableCell className="text-right font-medium text-ink">{formatIDR(row.value)}</TableCell>
                <TableCell>
                  <Badge variant="success" dot>
                    {row.status}
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
