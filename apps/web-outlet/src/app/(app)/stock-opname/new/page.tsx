"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stepper, type StepperStep } from "@/components/ui/Stepper";
import { Input, Label, Select } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { CheckIcon, ChevronLeftIcon, CloseIcon, OpnameIcon } from "@/components/icons";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";

const STEPS: StepperStep[] = [
  { key: "start", label: "Start" },
  { key: "counting", label: "Counting List" },
  { key: "physical", label: "Physical Qty" },
  { key: "variance", label: "Variance" },
  { key: "submit", label: "Submit" },
  { key: "approval", label: "Approval" },
  { key: "adjustment", label: "Adjustment" },
];

type ApprovalState = "waiting" | "approved" | "rejected";

export default function NewStockOpnamePage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("all");
  const [physicalQty, setPhysicalQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.sku, p.stock]))
  );
  const [approval, setApproval] = useState<ApprovalState>("waiting");

  const scopedProducts = useMemo(
    () => (category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );

  const varianceRows = useMemo(
    () =>
      scopedProducts.map((p) => ({
        ...p,
        physical: physicalQty[p.sku] ?? p.stock,
        variance: (physicalQty[p.sku] ?? p.stock) - p.stock,
      })),
    [scopedProducts, physicalQty]
  );

  const varianceCount = varianceRows.filter((r) => r.variance !== 0).length;

  function goNext() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div>
      <Link href="/stock-opname" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink">
        <ChevronLeftIcon width={15} height={15} />
        Kembali ke Stock Opname
      </Link>

      <PageHeader title="Stock Opname Baru" description="Ikuti alur langkah demi langkah untuk menyelesaikan perhitungan fisik stok." />

      <Card className="mb-4">
        <CardContent className="py-6">
          <Stepper steps={STEPS} activeIndex={step} />
        </CardContent>
      </Card>

      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mulai Stock Opname</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-ink-muted">
              Tentukan cakupan produk yang akan dihitung. Kode sesi akan dibuat otomatis saat Anda memulai.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="scope">Cakupan Kategori</Label>
                <Select id="scope" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">Semua Kategori ({PRODUCTS.length} produk)</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c} ({PRODUCTS.filter((p) => p.category === c).length} produk)
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="pic">Penanggung Jawab</Label>
                <Input id="pic" defaultValue="Dewi Anggraini" disabled />
              </div>
            </div>
            <div className="rounded-[10px] border border-border-subtle bg-surface-subtle px-4 py-3 text-xs text-ink-muted">
              Sesi ini akan menghasilkan kode <span className="font-medium text-ink">SO-20260925-02</span> dan mencakup{" "}
              <span className="font-medium text-ink">{scopedProducts.length} produk</span> untuk dihitung.
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={goNext}>Mulai Hitung</Button>
          </CardFooter>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Counting List</CardTitle>
              <p className="mt-0.5 text-xs text-ink-muted">Daftar produk yang perlu dihitung secara fisik oleh staf gudang.</p>
            </div>
            <Badge variant="info">{scopedProducts.length} produk</Badge>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Stok Sistem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scopedProducts.map((p) => (
                <TableRow key={p.sku}>
                  <TableCell className="font-medium text-ink">{p.name}</TableCell>
                  <TableCell className="text-ink-muted">{p.sku}</TableCell>
                  <TableCell className="text-ink-muted">{p.category}</TableCell>
                  <TableCell className="text-right text-ink-muted">
                    {p.stock} {p.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={goBack}>
              Kembali
            </Button>
            <Button onClick={goNext}>Lanjut Input Fisik</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Input Jumlah Fisik</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Stok Sistem</TableHead>
                <TableHead className="w-40 text-right">Jumlah Fisik</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scopedProducts.map((p) => (
                <TableRow key={p.sku}>
                  <TableCell className="font-medium text-ink">{p.name}</TableCell>
                  <TableCell className="text-ink-muted">{p.sku}</TableCell>
                  <TableCell className="text-right text-ink-muted">
                    {p.stock} {p.unit}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      className="text-right"
                      value={physicalQty[p.sku] ?? p.stock}
                      onChange={(e) =>
                        setPhysicalQty((prev) => ({ ...prev, [p.sku]: Math.max(0, Number(e.target.value) || 0) }))
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={goBack}>
              Kembali
            </Button>
            <Button onClick={goNext}>Hitung Selisih</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Variance</CardTitle>
              <p className="mt-0.5 text-xs text-ink-muted">Selisih antara stok sistem dan hasil hitung fisik.</p>
            </div>
            <Badge variant={varianceCount > 0 ? "warning" : "success"} dot>
              {varianceCount > 0 ? `${varianceCount} item selisih` : "Tidak ada selisih"}
            </Badge>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Stok Sistem</TableHead>
                <TableHead className="text-right">Stok Fisik</TableHead>
                <TableHead className="text-right">Selisih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {varianceRows.map((row) => (
                <TableRow key={row.sku}>
                  <TableCell className="font-medium text-ink">{row.name}</TableCell>
                  <TableCell className="text-right text-ink-muted">
                    {row.stock} {row.unit}
                  </TableCell>
                  <TableCell className="text-right text-ink-muted">
                    {row.physical} {row.unit}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      row.variance > 0 ? "text-success-600" : row.variance < 0 ? "text-error-600" : "text-ink-faint"
                    }`}
                  >
                    {row.variance > 0 ? `+${row.variance}` : row.variance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={goBack}>
              Kembali
            </Button>
            <Button onClick={goNext}>Lanjut ke Submit</Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Stock Opname</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-ink-muted">
              Tinjau ringkasan sebelum mengajukan hasil perhitungan ini untuk persetujuan supervisor.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <SummaryStat label="Total Produk" value={String(scopedProducts.length)} />
              <SummaryStat label="Item Selisih" value={String(varianceCount)} />
              <SummaryStat
                label="Selisih Positif"
                value={String(varianceRows.filter((r) => r.variance > 0).length)}
              />
              <SummaryStat
                label="Selisih Negatif"
                value={String(varianceRows.filter((r) => r.variance < 0).length)}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={goBack}>
              Kembali
            </Button>
            <Button onClick={goNext}>Ajukan untuk Persetujuan</Button>
          </CardFooter>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Approval</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            {approval === "waiting" && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-50 text-warning-600">
                  <OpnameIcon width={22} height={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">Menunggu Persetujuan Supervisor</p>
                  <p className="mt-1 max-w-sm text-sm text-ink-muted">
                    Hasil stock opname telah diajukan ke Herman Wijaya (Area Supervisor) untuk ditinjau.
                  </p>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button onClick={() => setApproval("approved")}>
                    <CheckIcon width={15} height={15} />
                    Simulasikan Disetujui
                  </Button>
                  <Button variant="destructive" onClick={() => setApproval("rejected")}>
                    <CloseIcon width={15} height={15} />
                    Simulasikan Ditolak
                  </Button>
                </div>
                <p className="mt-1 text-[11px] text-ink-faint">
                  Tombol simulasi disediakan untuk pratinjau alur — pada aplikasi nyata, persetujuan dilakukan oleh akun supervisor.
                </p>
              </>
            )}
            {approval === "approved" && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
                  <CheckIcon width={22} height={22} />
                </div>
                <p className="text-sm font-medium text-ink">Disetujui oleh Herman Wijaya</p>
                <p className="max-w-sm text-sm text-ink-muted">Lanjutkan untuk menyesuaikan data inventory.</p>
                <Button className="mt-2" onClick={goNext}>
                  Lanjut ke Adjustment
                </Button>
              </>
            )}
            {approval === "rejected" && (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-50 text-error-600">
                  <CloseIcon width={22} height={22} />
                </div>
                <p className="text-sm font-medium text-ink">Ditolak — perlu hitung ulang</p>
                <p className="max-w-sm text-sm text-ink-muted">
                  Supervisor meminta verifikasi ulang pada item dengan selisih besar sebelum disetujui.
                </p>
                <Button variant="secondary" className="mt-2" onClick={() => setStep(2)}>
                  Kembali ke Input Fisik
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
              <CheckIcon width={22} height={22} />
            </div>
            <p className="text-sm font-medium text-ink">Inventory Telah Disesuaikan</p>
            <p className="max-w-sm text-sm text-ink-muted">
              {varianceCount} item telah diperbarui pada catatan inventory sesuai hasil stock opname SO-20260925-02.
            </p>
            <Link href="/stock-opname" className="mt-2">
              <Button variant="secondary">Kembali ke Daftar Stock Opname</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-border bg-surface-subtle px-3 py-3 text-center">
      <p className="text-lg font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] text-ink-muted">{label}</p>
    </div>
  );
}
