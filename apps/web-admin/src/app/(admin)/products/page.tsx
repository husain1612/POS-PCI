import type { Metadata } from "next";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { products, categories } from "@/lib/mock-data";
import { formatIDR } from "@/lib/format";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Products"
        description="Master catalog shared across all outlets."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Product
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
          <div className="w-64">
            <Input icon={<Search className="h-4 w-4" />} placeholder="Search by name or SKU…" />
          </div>
          <Select className="w-48" defaultValue="">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </Select>
          <Select className="w-40" defaultValue="">
            <option value="">All status</option>
            <option>Active</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
            <option>Inactive</option>
          </Select>
        </div>
        <Table>
          <THead>
            <Tr>
              <Th>Product</Th>
              <Th>SKU</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Outlet</Th>
              <Th>Status</Th>
              <Th className="w-10" />
            </Tr>
          </THead>
          <TBody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td className="font-medium">{product.name}</Td>
                <Td className="text-ink-secondary">{product.sku}</Td>
                <Td className="text-ink-secondary">{product.category}</Td>
                <Td className="tabular-nums">{formatIDR(product.price)}</Td>
                <Td className="tabular-nums">{product.stock}</Td>
                <Td className="text-ink-secondary">{product.outlet}</Td>
                <Td>
                  <StatusBadge status={product.status} />
                </Td>
                <Td>
                  <Button variant="ghost" size="icon" aria-label="More actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
        <Pagination page={1} pageCount={1} totalLabel={`${products.length} of 612 products`} />
      </Card>
    </div>
  );
}
