import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InterviewsAdminTable } from "@/components/admin/InterviewsAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminInterviewsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Interviews"
        action={
          <AdminPrimaryLink href="/admin/interviews/new">New interview</AdminPrimaryLink>
        }
      />
      <div className="min-w-0 p-4 sm:p-6 md:p-8">
        <InterviewsAdminTable />
      </div>
    </div>
  );
}
