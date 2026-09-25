import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { PlusIcon } from "@/components/icons";
import { STOCK_OPNAMES } from "@/lib/mock-data";
import { OPNAME_STATUS_LABEL, OPNAME_STATUS_VARIANT } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

export default function StockOpnamePage() {
  return (
    <div>
      <PageHeader
        title="Stock Opname"
        description="Perhitungan fisik stok berkala untuk memastikan data inventory akurat."
        actions={
          <Link href="/stock-opname/new">
            <Button size="sm">
              <PlusIcon width={15} height={15} />
              Mulai Stock Opname
            </Button>
          </Link>
        }
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Dibuat Oleh</TableHead>
              <TableHead className="text-right">Jumlah Item</TableHead>
              <TableHead className="text-right">Selisih</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {STOCK_OPNAMES.map((so) => (
              <TableRow key={so.id}>
                <TableCell className="font-medium text-ink">{so.code}</TableCell>
                <TableCell className="text-ink-muted">{formatDate(so.date)}</TableCell>
                <TableCell className="text-ink-muted">{so.createdBy}</TableCell>
                <TableCell className="text-right text-ink-muted">{so.itemCount}</TableCell>
                <TableCell className="text-right text-ink-muted">
                  {so.varianceCount > 0 ? `${so.varianceCount} item` : "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={OPNAME_STATUS_VARIANT[so.status]} dot>
                    {OPNAME_STATUS_LABEL[so.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/stock-opname/${so.id}`}>
                    <Button variant="ghost" size="sm">
                      Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
