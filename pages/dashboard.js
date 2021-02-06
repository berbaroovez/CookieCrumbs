import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import PendingOrderTable from "@/components/PendingOrderTable";
import DashboardEmptyState from "@/components/DashboardEmptyState";

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/orders/pendingOrders", user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <>
        <DashboardSkeleton>
          <SiteTableSkeleton />
        </DashboardSkeleton>
      </>
    );
  }
  if (data.orderList.length) {
    return (
      <DashboardSkeleton>
        <PendingOrderTable orders={data.orderList} />
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
