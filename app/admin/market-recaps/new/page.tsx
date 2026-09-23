import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketRecapForm } from "@/components/admin/MarketRecapForm";

export default function NewMarketRecapPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New market recap" />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <MarketRecapForm />
      </div>
    </div>
  );
}
