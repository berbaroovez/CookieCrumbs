import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import OrderTable from "@/components/OrderTable";
import DashboardEmptyState from "@/components/DashboardEmptyState";

import { Text, Flex, Box } from "@chakra-ui/react";
import MonthlyStats from "@/components/MonthlyStats";
export default function Test() {
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
            <MonthlyStats />
          </Flex>
        </DashboardSkeleton>
      </>
    );
  }
  if (data.orderList.length) {
    return (
      <DashboardSkeleton>
        <OrderTable orders={data.orderList} />
      </DashboardSkeleton>
    );
  }

  return (
    <Box
      bgGradient="linear(to-l, #7928CA,#FF0080)"
      padding="2px"
      borderRadius="20px"
      mb={8}
      display="inline-block"
    >
      <Box
        width="500px"
        background="blue.200"
        height={32}
        borderRadius="20px"
      ></Box>
    </Box>
  );
}
