import { fetchData } from "@/actions/productsActions";
import DataTable from "@/components/PagesComponent/accounts/DataTable";
export default async function AccountsPage() {
  const data = await fetchData();
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable data={data} />
      </div>
    </div>
  );
}
