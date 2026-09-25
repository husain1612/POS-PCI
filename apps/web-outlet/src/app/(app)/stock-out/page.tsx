import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StockMovementForm } from "@/components/forms/StockMovementForm";
import { formatIDR } from "@/lib/utils";

const RECENT_STOCK_OUT = [
  { id: "so1", ref: "SO-INT-0041", date: "24 Sep 2026", reason: "Barang Rusak", items: 2, value: 76000, status: "Diproses" },
  { id: "so2", ref: "SO-INT-0040", date: "23 Sep 2026", reason: "Kadaluarsa", items: 1, value: 45000, status: "Diproses" },
  { id: "so3", ref: "SO-INT-0039", date: "21 Sep 2026", reason: "Pemakaian Internal", items: 4, value: 120000, status: "Diproses" },
];

export default function StockOutPage() {
  return (
    <div>
      <PageHeader title="Stock Out" description="Catat pengeluaran barang dari inventory outlet — kerusakan, kadaluarsa, atau pemakaian internal." />

      <div className="mb-6">
        <StockMovementForm mode="out" />
      </div>

      <Card>
        <div className="border-b border-border-subtle px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ink">Riwayat Stock Out Terbaru</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referensi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Alasan</TableHead>
              <TableHead className="text-right">Jumlah Item</TableHead>
              <TableHead className="text-right">Nilai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_STOCK_OUT.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-ink">{row.ref}</TableCell>
                <TableCell className="text-ink-muted">{row.date}</TableCell>
                <TableCell className="text-ink-muted">{row.reason}</TableCell>
                <TableCell className="text-right text-ink-muted">{row.items} SKU</TableCell>
                <TableCell className="text-right font-medium text-ink">{formatIDR(row.value)}</TableCell>
                <TableCell>
                  <Badge variant="warning" dot>
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
