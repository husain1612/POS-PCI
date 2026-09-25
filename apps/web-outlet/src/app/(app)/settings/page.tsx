"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import { CURRENT_USER, OUTLET } from "@/lib/mock-data";

function Toggle({ defaultChecked = false, label, description }: { defaultChecked?: boolean; label: string; description?: string }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="mt-0.5 text-xs text-ink-muted">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((c) => !c)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand-600" : "bg-border"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

function OutletProfileTab() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Profil Outlet</CardTitle>
          <CardDescription>Informasi ini dikelola terpusat oleh Web Admin dan bersifat baca-saja di sini.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="outlet-name">Nama Outlet</Label>
          <Input id="outlet-name" defaultValue={OUTLET.name} disabled />
        </div>
        <div>
          <Label htmlFor="outlet-code">Kode Outlet</Label>
          <Input id="outlet-code" defaultValue={OUTLET.code} disabled />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="outlet-address">Alamat</Label>
          <Input id="outlet-address" defaultValue={OUTLET.address} disabled />
        </div>
        <div>
          <Label htmlFor="outlet-manager">Manajer Outlet</Label>
          <Input id="outlet-manager" defaultValue={OUTLET.manager} disabled />
        </div>
        <div>
          <Label htmlFor="outlet-timezone">Zona Waktu</Label>
          <Select id="outlet-timezone" defaultValue="wib" disabled>
            <option value="wib">WIB (GMT+7)</option>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="secondary" size="sm" disabled>
          Hubungi Admin Pusat untuk Ubah
        </Button>
      </CardFooter>
    </Card>
  );
}

function NotificationSettingsTab() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Preferensi Notifikasi</CardTitle>
          <CardDescription>Pilih notifikasi yang ingin Anda terima di Web Outlet.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border-subtle">
        <Toggle defaultChecked label="Stok Menipis" description="Peringatan saat stok produk mendekati batas minimum." />
        <Toggle defaultChecked label="Stok Habis" description="Peringatan saat produk habis di outlet." />
        <Toggle defaultChecked label="Permintaan Refund" description="Notifikasi saat kasir mengajukan permintaan refund." />
        <Toggle defaultChecked label="Persetujuan Stock Opname" description="Notifikasi status persetujuan stock opname." />
        <Toggle label="Sinkronisasi Gagal" description="Peringatan saat transaksi Mobile POS gagal sinkron." />
        <Toggle label="Peringatan Sistem" description="Pengumuman pemeliharaan dan pembaruan sistem." />
      </CardContent>
    </Card>
  );
}

function AccountTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Akun Saya</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
          {CURRENT_USER.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{CURRENT_USER.name}</p>
          <p className="text-xs text-ink-muted">{CURRENT_USER.role} · {OUTLET.name}</p>
        </div>
      </CardContent>
      <CardContent className="grid grid-cols-1 gap-4 border-t border-border-subtle sm:grid-cols-2">
        <div>
          <Label htmlFor="acc-name">Nama Lengkap</Label>
          <Input id="acc-name" defaultValue={CURRENT_USER.name} />
        </div>
        <div>
          <Label htmlFor="acc-email">Email</Label>
          <Input id="acc-email" type="email" defaultValue="dewi.anggraini@kopinusantara.id" />
        </div>
        <div>
          <Label htmlFor="acc-phone">No. Telepon</Label>
          <Input id="acc-phone" defaultValue="0812-9988-7766" />
        </div>
        <div>
          <Label htmlFor="acc-role">Peran</Label>
          <Input id="acc-role" defaultValue={CURRENT_USER.role} disabled />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Simpan Perubahan</Button>
      </CardFooter>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Kelola preferensi akun dan notifikasi untuk Web Outlet." />
      <Tabs
        items={[
          { key: "outlet", label: "Profil Outlet", content: <OutletProfileTab /> },
          { key: "notifications", label: "Notifikasi", content: <NotificationSettingsTab /> },
          { key: "account", label: "Akun", content: <AccountTab /> },
        ]}
      />
    </div>
  );
}
