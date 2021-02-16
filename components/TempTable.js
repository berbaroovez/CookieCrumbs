import React from "react";
import { Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { parseISO, format } from "date-fns";
import NextLink from "next/link";
import { ThemeContext } from "@emotion/react";

export default function TempTable({ orders, ...props }) {
  return (
    <Table height={16}>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>Theme</Th>
          <Th>Quantity</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <Tr>
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
      </tbody>
      {/* <Tfoot>
        <Tr>
          <Th>Pending Orders</Th>
        </Tr>
      </Tfoot> */}
    </Table>
  );
}
