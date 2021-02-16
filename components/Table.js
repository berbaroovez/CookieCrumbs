import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    backgroundColor="gray.50"
    fontWeight="medium"
    px={4}
    {...props}
  />
);

export const Td = (props) => <Box as="td" color="gray.900" p={4} {...props} />;

export const Tr = (props) => (
  <Box
    as="tr"
    // backgroundColor="gray.50"
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    {...props}
    borderRadius="20px"
  />
);

export const Table = (props) => {
  return (
    <Box
      height="200px"
      as="table"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={"20px"}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
    />
  );
};
