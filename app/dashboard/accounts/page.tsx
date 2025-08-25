import { DataTable } from "@/components/PagesComponent/accounts/DataTable";
import data from "@/lib/data.json";
export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable data={data} />
      </div>
    </div>
  );
}
