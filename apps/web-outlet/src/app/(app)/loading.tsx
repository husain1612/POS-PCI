import { Card } from "@/components/ui/Card";
import { LoadingCard, LoadingRows } from "@/components/ui/States";

export default function AppLoading() {
  return (
    <div>
      <div className="mb-5">
        <div className="h-6 w-40 animate-pulse rounded-md bg-surface-subtle" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-surface-subtle" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
      <Card className="mt-4">
        <LoadingRows rows={6} cols={5} />
      </Card>
    </div>
  );
}
