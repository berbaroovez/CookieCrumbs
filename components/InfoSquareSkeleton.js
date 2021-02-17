import { Box, Skeleton, Flex } from "@chakra-ui/react";

export default function InfoSquareSkeleton() {
  return (
    <Box background="white" w={44} h={24} borderRadius="20px" p={4}>
      <Flex direction="column" justifyContent="center">
        <Skeleton height="8px" w={20} my={4} mx={8} />
        <Skeleton height="8px" w={8} my={2} mx={14} />
      </Flex>
    </Box>
  );
}
