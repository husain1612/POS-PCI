import type { Metadata } from "next";
import { MoreHorizontal, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/mock-data";
import { CHART_BG } from "@/components/ui/charts/chart-colors";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organize products into browsable categories."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, i) => (
          <Card key={category.id} className="p-5">
            <div className="flex items-start justify-between">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-md text-white", CHART_BG[i % CHART_BG.length])}>
                <span className="text-sm font-semibold">{category.name.charAt(0)}</span>
              </span>
              <Button variant="ghost" size="icon" aria-label="More actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink-primary">{category.name}</p>
            <p className="mt-0.5 text-[13px] text-ink-muted">{category.productCount} products</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
