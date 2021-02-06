import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import PendingOrderTable from "@/components/PendingOrderTable";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import DashboardEmptyState from "@/components/DashboardEmptyState";
export default function Dashboard() {
  const [searchbar, setSearchbar] = useState("");
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/orders/allOrders", user.token] : null,
    fetcher
  );

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchbar(e.target.value);
  };
  if (!data) {
    return (
      <>
        <DashboardSkeleton>
          <SiteTableSkeleton />
          <SiteTableSkeleton />
        </DashboardSkeleton>
      </>
    );
  }
  if (data.orderList.length) {
    const filteredData = data.orderList.filter((order) =>
      order.name.toLowerCase().includes(searchbar.toLowerCase())
    );
    return (
      <DashboardSkeleton>
        <Searchbar onChange={handleChange} />
        <PendingOrderTable orders={filteredData} />
      </DashboardSkeleton>
    );
  }

  return (
    <>
      <DashboardSkeleton>
        <DashboardEmptyState />
      </DashboardSkeleton>
    </>
  );
}
