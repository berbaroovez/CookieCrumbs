import React from "react";
import { Box, Skeleton, Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { parseISO, format } from "date-fns";
import NextLink from "next/link";
const SkeletonRow = ({ width }) => (
  //No bottom border on the last row because of the border radius
  <Box
    as="tr"
    borderBottom="1px solid"
    borderBottomColor="blue.100"
    _last={{ borderBottom: "none" }}
  >
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td borderBottom="none">
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

export default function PendingOrderTable({ orders }) {
  return (
    <Table mb={8}>
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
          <Box as="tr" key={order.id}>
            <Td fontWeight="medium">{order.name}</Td>
            <Td>{format(parseISO(order.eventDate), "P")}</Td>
            <Td>{order.theme}</Td>
            <Td>{order.quantity}</Td>
            <Td>
              <NextLink href="/r/[orderId]" as={`/r/${order.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View
                </Link>
              </NextLink>
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
}

{
  /* <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink> */
}
