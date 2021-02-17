import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import OrderTable from "@/components/OrderTable";
import Searchbar from "@/components/Searchbar";
import { useState } from "react";
import DashboardEmptyState from "@/components/DashboardEmptyState";
import TempTable from "../components/TempTable";
export default function Dashboard() {
  const [searchbar, setSearchbar] = useState("");
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/orders/allOrders", user.token] : null,
    fetcher
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearchbar(e.target.value);
  };
  if (!data) {
    return (
      <>
        <DashboardSkeleton>
          <SiteTableSkeleton />
        </DashboardSkeleton>
      </>
    );
  }
  if (data) {
    const filteredData = data.orderList.filter((order) =>
      order.name.toLowerCase().includes(searchbar.toLowerCase())
    );
    return (
      <DashboardSkeleton>
        <Searchbar onChange={handleChange} />
        {/* <OrderTable orders={filteredData} /> */}
        <TempTable orders={filteredData} />
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
