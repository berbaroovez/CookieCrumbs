import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import OrderTable from "@/components/OrderTable";
import DashboardEmptyState from "@/components/DashboardEmptyState";

import { Text, Flex } from "@chakra-ui/react";
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
          <Flex direction="column">
            <Text fontSize="2xl" fontWeight="medium" mb={4}>
              Pending Orders
            </Text>
            <SiteTableSkeleton />
          </Flex>
        </DashboardSkeleton>
      </>
    );
  }
  if (data.orderList.length) {
    return (
      <DashboardSkeleton>
        <Flex direction="column">
          <Text fontSize="2xl" fontWeight="medium" mb={4}>
            Pending Orders
          </Text>
          <OrderTable orders={data.orderList} />
        </Flex>
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
