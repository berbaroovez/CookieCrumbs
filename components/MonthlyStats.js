import { useAuth } from "@/lib/auth";
import {
  Flex,
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { parseISO, format, subMonths } from "date-fns";
export default function MonthlyStats({ ...rest }) {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/orders/getCompletedOrders", user.token] : null,
    fetcher
  );

  // const [runningTotal, setRunningTotal] = useState(0);
  // const [totalOrders, setTotalOrders] = useState(0);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [monthAgoDate, setMonthAgoDate] = useState(subMonths(new Date(), 1));

  const calculateRevenue = (orders) => {
    var runningTotal = 0;
    var totalOrders = 0;

    orders.forEach((order) => {
      if (
        monthAgoDate < parseISO(order.eventDate) &&
        todaysDate >= parseISO(order.eventDate)
      ) {
        runningTotal += order.cost;
        totalOrders += 1;
      }
    });

    return { runningTotal, totalOrders };
  };

  if (!data) {
    return (
      <Box background="white" borderRadius="20px" w={64} p={4} {...rest}>
        <Skeleton height="10px" w="100px" my={4} />
        <Skeleton height="40px" w="100px" my={4} />
        <Skeleton height="10px" w="100px" my={4} />
      </Box>
    );
  }

  if (data) {
    const { runningTotal, totalOrders } = calculateRevenue(data.orderList);
    return (
      <Box
        background="white"
        borderRadius="20px"
        h={32}
        minW={48}
        w={48}
        p={4}
        {...rest}
      >
        <Flex>
          <Stat>
            <StatLabel fontWeight="bold">Revenue</StatLabel>
            <StatNumber>${runningTotal}</StatNumber>
            <StatHelpText>
              {format(monthAgoDate, "LLL d")} - {format(todaysDate, "LLL d")}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontWeight="bold">Orders</StatLabel>
            <StatNumber>{totalOrders}</StatNumber>
          </Stat>
        </Flex>
      </Box>
    );
  }

  {
  }

  return (
    <Box background="white" borderRadius="20px" w={64} p={4} {...rest}>
      <Stat>
        <StatLabel>No Orders</StatLabel>
        <StatNumber>$0.00</StatNumber>
        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
      </Stat>
    </Box>
  );
}
