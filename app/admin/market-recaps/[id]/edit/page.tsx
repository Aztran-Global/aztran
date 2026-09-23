import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketRecapForm } from "@/components/admin/MarketRecapForm";
import type { Id } from "@/convex/_generated/dataModel";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditMarketRecapPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit market recap" />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <MarketRecapForm marketRecapId={id as Id<"marketRecaps">} />
      </div>
    </div>
  );
}
