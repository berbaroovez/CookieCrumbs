import React from "react";
import { Link, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

import { parseISO, format } from "date-fns";
import NextLink from "next/link";

export default function OrderTable({ orders, ...props }) {
  return (
    <Table background="white" variant="unstyled" borderRadius="20px" {...props}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>Theme</Th>
          <Th>Quantity</Th>
          <Th>{""}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.createdAt}>
            <Td
              maxW={40}
              isTruncated
              fontWeight="600"
              borderBottomLeftRadius="20px"
            >
              {order.name}
            </Td>
            <Td>{format(parseISO(order.eventDate), "P")}</Td>
            <Td>{order.theme}</Td>
            <Td>{order.quantity}</Td>
            <Td borderBottomRightRadius="20px">
              <NextLink href="/r/[orderId]" as={`/r/${order.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View
                </Link>
              </NextLink>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
