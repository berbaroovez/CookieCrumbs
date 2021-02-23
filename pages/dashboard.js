import DashboardSkeleton from "../components/DashboardSkeleton";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import OrderTable from "@/components/OrderTable";
import DashboardEmptyState from "@/components/DashboardEmptyState";
import { PickUpTable } from "@/components/PickUpTable";
import { Text, Flex, Box, Stack } from "@chakra-ui/react";
import MonthlyStats from "@/components/MonthlyStats";
import InfoSquare from "@/components/InfoSquare";
import InfoSquareSkeleton from "@/components/InfoSquareSkeleton";
import fileUpload from "@/components/fileUpload";
import {
  getSquaresInfo,
  getPendingOrders,
  getCookieCalender,
} from "@/utils/dashboardfunctions";
export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/orders/allOrders", user.token] : null,
    fetcher
  );
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (!data) {
    return (
      <>
        <DashboardSkeleton>
          <Stack spacing={4} direction="row">
            <InfoSquareSkeleton />
            <InfoSquareSkeleton />
            <InfoSquareSkeleton />
          </Stack>
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
    const squareInfo = getSquaresInfo(data.orderList);
    getCookieCalender(data.orderList, tomorrow);
    return (
      <DashboardSkeleton>
        <Flex justifyContent="space-evenly" width="600px">
          {/* <Stack spacing={4} direction="row" width="600px" background="red"> */}
          <InfoSquare title="Monthly Revenue">${squareInfo.profit}</InfoSquare>
          <InfoSquare title="Monthly Orders">{squareInfo.orders}</InfoSquare>
          <InfoSquare title="#1 Theme">{squareInfo.theme}</InfoSquare>
          {/* </Stack> */}
        </Flex>
        <Flex flexDirection={{ base: "column", lg: "row" }}>
          <Flex direction="column" marginEnd={4}>
            <Text fontSize="2xl" fontWeight="medium" mb={4}>
              Pending Orders
            </Text>

            <OrderTable
              orders={getPendingOrders(data.orderList)}
              mb={4}
              width="600px"
            />
          </Flex>
        </Flex>
        <Text fontSize="2xl" fontWeight="medium" mb={4}>
          Pickups
        </Text>
        <PickUpTable
          width="600px"
          orders={getCookieCalender(data.orderList, tomorrow)}
          startDate={tomorrow}
        />
        <fileUpload />
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
