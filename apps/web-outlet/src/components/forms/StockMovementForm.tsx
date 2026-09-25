"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { PRODUCTS, SUPPLIERS } from "@/lib/mock-data";
import { formatIDR } from "@/lib/utils";

interface Line {
  id: string;
  sku: string;
  qty: number;
  unitCost: number;
}

function newLine(index: number): Line {
  const product = PRODUCTS[index % PRODUCTS.length];
  return { id: `line-${Date.now()}-${index}`, sku: product.sku, qty: 1, unitCost: product.cost };
}

export function StockMovementForm({ mode }: { mode: "in" | "out" }) {
  const [lines, setLines] = useState<Line[]>([newLine(0)]);
  const [submitted, setSubmitted] = useState(false);
  const isIn = mode === "in";

  function updateLine(id: string, patch: Partial<Line>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function addLine() {
    setLines((prev) => [...prev, newLine(prev.length)]);
  }

  function removeLine(id: string) {
    setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));
  }

  const total = lines.reduce((sum, l) => sum + l.qty * l.unitCost, 0);

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckIcon width={22} height={22} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">
              {isIn ? "Stock In berhasil dicatat" : "Stock Out berhasil dicatat"}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {lines.length} item telah {isIn ? "ditambahkan ke" : "dikurangi dari"} inventory outlet.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
            Catat Transaksi Baru
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{isIn ? "Item Barang Masuk" : "Item Barang Keluar"}</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="w-28 text-right">Qty</TableHead>
                <TableHead className="w-36 text-right">{isIn ? "Biaya Satuan" : "Est. Nilai"}</TableHead>
                <TableHead className="w-32 text-right">Subtotal</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <Select value={line.sku} onChange={(e) => {
                      const p = PRODUCTS.find((p) => p.sku === e.target.value);
                      updateLine(line.id, { sku: e.target.value, unitCost: p?.cost ?? line.unitCost });
                    }}>
                      {PRODUCTS.map((p) => (
                        <option key={p.sku} value={p.sku}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={1}
                      value={line.qty}
                      onChange={(e) => updateLine(line.id, { qty: Math.max(1, Number(e.target.value) || 1) })}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={line.unitCost}
                      onChange={(e) => updateLine(line.id, { unitCost: Math.max(0, Number(e.target.value) || 0) })}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right font-medium text-ink">{formatIDR(line.qty * line.unitCost)}</TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      className="text-xs font-medium text-ink-faint hover:text-error-600"
                      aria-label="Hapus item"
                    >
                      ✕
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter className="justify-between">
            <Button type="button" variant="outline" size="sm" onClick={addLine}>
              <PlusIcon width={14} height={14} />
              Tambah Item
            </Button>
            <div className="text-sm">
              <span className="text-ink-muted">Total {isIn ? "Nilai Masuk" : "Nilai Keluar"}: </span>
              <span className="font-semibold text-ink">{formatIDR(total)}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Detail {isIn ? "Penerimaan" : "Pengeluaran"}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3.5">
              {isIn && (
                <div>
                  <Label htmlFor="supplier">Supplier (opsional)</Label>
                  <Select id="supplier" defaultValue="">
                    <option value="">Tanpa supplier</option>
                    {SUPPLIERS.filter((s) => s.status === "active").map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              {!isIn && (
                <div>
                  <Label htmlFor="reason">Alasan</Label>
                  <Select id="reason" defaultValue="usage">
                    <option value="usage">Pemakaian Internal</option>
                    <option value="damaged">Barang Rusak</option>
                    <option value="expired">Kadaluarsa</option>
                    <option value="transfer">Transfer Antar Outlet</option>
                    <option value="other">Lainnya</option>
                  </Select>
                </div>
              )}
              <div>
                <Label htmlFor="ref">No. Referensi</Label>
                <Input id="ref" placeholder={isIn ? "PO-2026-0091" : "SO-INT-0042"} />
              </div>
              <div>
                <Label htmlFor="date">Tanggal</Label>
                <Input id="date" type="date" defaultValue="2026-09-25" />
              </div>
              <div>
                <Label htmlFor="note">Catatan</Label>
                <Textarea id="note" rows={3} placeholder="Catatan tambahan (opsional)" />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            {isIn ? "Simpan Stock In" : "Simpan Stock Out"}
          </Button>
        </div>
      </div>
    </form>
  );
}
