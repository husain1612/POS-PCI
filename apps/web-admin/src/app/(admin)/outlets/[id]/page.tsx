import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Pencil, Phone, Store, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { outlets, products, adminUsers } from "@/lib/mock-data";
import { formatIDR, formatNumber } from "@/lib/format";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const outlet = outlets.find((o) => o.id === params.id);
  return { title: outlet ? outlet.name : "Outlet not found" };
}

export default function OutletDetailPage({ params }: { params: { id: string } }) {
  const outlet = outlets.find((o) => o.id === params.id);
  if (!outlet) notFound();

  const staff = adminUsers.filter((u) => u.outlet === outlet.name);
  const outletProducts = products.filter((p) => p.outlet === outlet.name);

  return (
    <div>
      <Link href="/outlets" className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-ink-primary">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Outlets
      </Link>

      <PageHeader
        title={outlet.name}
        description={`${outlet.code} · ${outlet.city}`}
        action={
          <>
            <StatusBadge status={outlet.status} />
            <Button variant="secondary" size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Edit Outlet
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Outlet Information" />
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <InfoRow icon={Store} label="Outlet Name" value={outlet.name} />
              <InfoRow icon={Store} label="Outlet Code" value={outlet.code} />
              <InfoRow icon={Users} label="Manager" value={outlet.manager} />
              <InfoRow icon={Phone} label="Phone" value={outlet.phone} />
              <InfoRow icon={MapPin} label="Address" value={`${outlet.address}, ${outlet.city}`} span />
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-[13px] font-medium text-ink-secondary">Revenue this month</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-primary">{formatIDR(outlet.revenueThisMonth)}</p>
          </Card>
          <Card className="p-5">
            <p className="text-[13px] font-medium text-ink-secondary">Transactions this month</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-primary">{formatNumber(outlet.transactionsThisMonth)}</p>
          </Card>
          <Card className="p-5">
            <p className="text-[13px] font-medium text-ink-secondary">Employees</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-primary">{outlet.employeeCount}</p>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader title="Staff" description={`${staff.length} people assigned to this outlet`} />
        <Table>
          <THead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Last Active</Th>
            </Tr>
          </THead>
          <TBody>
            {staff.length === 0 && (
              <Tr>
                <Td colSpan={4} className="py-8 text-center text-ink-muted">
                  No staff assigned yet.
                </Td>
              </Tr>
            )}
            {staff.map((u) => (
              <Tr key={u.id}>
                <Td className="font-medium">{u.name}</Td>
                <Td className="text-ink-secondary">{u.role}</Td>
                <Td>
                  <StatusBadge status={u.status} />
                </Td>
                <Td className="text-ink-secondary">{u.lastActive.slice(0, 10)}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>

      <Card className="mt-4">
        <CardHeader title="Products at this Outlet" description={`${outletProducts.length} products`} />
        <Table>
          <THead>
            <Tr>
              <Th>Product</Th>
              <Th>SKU</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {outletProducts.length === 0 && (
              <Tr>
                <Td colSpan={5} className="py-8 text-center text-ink-muted">
                  No products recorded for this outlet.
                </Td>
              </Tr>
            )}
            {outletProducts.map((p) => (
              <Tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td className="text-ink-secondary">{p.sku}</Td>
                <Td className="tabular-nums">{formatIDR(p.price)}</Td>
                <Td className="tabular-nums">{p.stock}</Td>
                <Td>
                  <StatusBadge status={p.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: typeof Store;
  label: string;
  value: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-1 text-sm text-ink-primary">{value}</dd>
    </div>
  );
}
