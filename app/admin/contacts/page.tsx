import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ContactsTable } from "@/components/admin/ContactsTable";

export default function AdminContactsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="Contact Submissions" />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <ContactsTable />
      </div>
    </div>
  );
}
