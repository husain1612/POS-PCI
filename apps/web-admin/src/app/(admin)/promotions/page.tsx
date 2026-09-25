import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { promotions } from "@/lib/mock-data";
import { formatDate, formatNumber } from "@/lib/format";
import type { PromotionType } from "@/lib/types";

export const metadata: Metadata = { title: "Promotions" };

const typeLabel: Record<PromotionType, string> = {
  percentage: "Percentage",
  fixed: "Fixed Amount",
  bogo: "Buy One Get One",
};

export default function PromotionsPage() {
  return (
    <div>
      <PageHeader
        title="Promotions"
        description="Discounts, vouchers and bundles across outlets."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Promotion
          </Button>
        }
      />

      <Card>
        <Table>
          <THead>
            <Tr>
              <Th>Promotion</Th>
              <Th>Type</Th>
              <Th>Scope</Th>
              <Th>Outlet Scope</Th>
              <Th>Period</Th>
              <Th>Redemptions</Th>
              <Th>Status</Th>
            </Tr>
          </THead>
          <TBody>
            {promotions.map((promo) => (
              <Tr key={promo.id}>
                <Td>
                  <p className="font-medium text-ink-primary">{promo.name}</p>
                  <p className="mt-0.5 max-w-xs whitespace-normal text-xs text-ink-muted">{promo.rule}</p>
                </Td>
                <Td>
                  <Badge tone="brand">{typeLabel[promo.type]}</Badge>
                </Td>
                <Td className="max-w-[180px] whitespace-normal text-ink-secondary">{promo.scope}</Td>
                <Td className="max-w-[180px] whitespace-normal text-ink-secondary">{promo.outletScope}</Td>
                <Td className="text-ink-secondary">
                  {formatDate(promo.startDate)} – {formatDate(promo.endDate)}
                </Td>
                <Td className="tabular-nums">{formatNumber(promo.redemptions)}</Td>
                <Td>
                  <StatusBadge status={promo.status} />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
