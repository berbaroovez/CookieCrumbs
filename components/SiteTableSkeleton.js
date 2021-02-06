import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";

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

const SiteTableSkeleton = () => {
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
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  );
};

export default SiteTableSkeleton;
