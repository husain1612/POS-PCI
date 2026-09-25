import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ChevronLeftIcon } from "@/components/icons";
import { STOCK_OPNAMES } from "@/lib/mock-data";
import { OPNAME_STATUS_LABEL, OPNAME_STATUS_VARIANT } from "@/lib/labels";
import { formatDateTime } from "@/lib/utils";

export function generateStaticParams() {
  return STOCK_OPNAMES.map((so) => ({ id: so.id }));
}

export default function StockOpnameDetailPage({ params }: { params: { id: string } }) {
  const opname = STOCK_OPNAMES.find((so) => so.id === params.id);
  if (!opname) notFound();

  const varianceItems = opname.items.filter((i) => i.variance !== 0);

  return (
    <div>
      <Link href="/stock-opname" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink">
        <ChevronLeftIcon width={15} height={15} />
        Kembali ke Stock Opname
      </Link>

      <PageHeader
        title={opname.code}
        description={`Dibuat oleh ${opname.createdBy} · ${formatDateTime(opname.date)}`}
        actions={
          <Badge variant={OPNAME_STATUS_VARIANT[opname.status]} dot>
            {OPNAME_STATUS_LABEL[opname.status]}
          </Badge>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricBox label="Total Item Dihitung" value={String(opname.itemCount)} />
        <MetricBox label="Item Selisih" value={String(opname.varianceCount)} tone={opname.varianceCount > 0 ? "warning" : undefined} />
        <MetricBox label="Disetujui Oleh" value={opname.approvedBy ?? "Menunggu persetujuan"} />
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Hasil Perhitungan</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Stok Sistem</TableHead>
              <TableHead className="text-right">Stok Fisik</TableHead>
              <TableHead className="text-right">Selisih</TableHead>
              <TableHead>Catatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opname.items.map((item) => (
              <TableRow key={item.sku}>
                <TableCell className="font-medium text-ink">{item.productName}</TableCell>
                <TableCell className="text-ink-muted">{item.sku}</TableCell>
                <TableCell className="text-right text-ink-muted">{item.systemQty} {item.unit}</TableCell>
                <TableCell className="text-right text-ink-muted">{item.physicalQty} {item.unit}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    item.variance > 0 ? "text-success-600" : item.variance < 0 ? "text-error-600" : "text-ink-faint"
                  }`}
                >
                  {item.variance > 0 ? `+${item.variance}` : item.variance}
                </TableCell>
                <TableCell className="text-ink-muted">{item.note ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {varianceItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink-muted">
            {opname.status === "adjusted"
              ? `${varianceItems.length} item telah disesuaikan pada catatan inventory sesuai hasil perhitungan fisik.`
              : `${varianceItems.length} item memiliki selisih dan menunggu persetujuan sebelum inventory disesuaikan.`}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricBox({ label, value, tone }: { label: string; value: string; tone?: "warning" }) {
  return (
    <div className={`rounded-xl border p-4 ${tone === "warning" ? "border-warning-500/30 bg-warning-50" : "border-border bg-surface-raised"}`}>
      <p className={`text-xs font-medium ${tone === "warning" ? "text-warning-600" : "text-ink-muted"}`}>{label}</p>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
