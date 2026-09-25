import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { suppliers } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Suppliers" };

export default function SuppliersPage() {
  return (
    <div>
      <PageHeader
        title="Suppliers"
        description="Vendors and supply partners feeding your outlets."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Supplier
          </Button>
        }
      />

      <Card>
        <Table>
          <THead>
            <Tr>
              <Th>Supplier</Th>
              <Th>Contact Person</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Category</Th>
              <Th>Outstanding PO</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {suppliers.map((supplier) => (
              <Tr key={supplier.id}>
                <Td className="font-medium">{supplier.name}</Td>
                <Td className="text-ink-secondary">{supplier.contactPerson}</Td>
                <Td className="text-ink-secondary">{supplier.phone}</Td>
                <Td className="text-ink-secondary">{supplier.email}</Td>
                <Td className="text-ink-secondary">{supplier.category}</Td>
                <Td className="tabular-nums">{supplier.outstandingPO}</Td>
                <Td>
                  <StatusBadge status={supplier.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
