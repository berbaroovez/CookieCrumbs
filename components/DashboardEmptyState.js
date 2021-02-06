import { Box, Text, Heading, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export default function DashboardEmptyState() {
  return (
    <Box background="white" borderRadius="20px" p={8} maxW="700px">
      <Heading size="md">It looks like you do not have any orders yet!</Heading>
      <Text fontSize="xl" mb={4}>
        Head over to your settings page to get the url to your order form
      </Text>
      <NextLink href="/settings" passHref>
        <Link>
          <Button colorScheme="teal">Settings</Button>
        </Link>
      </NextLink>
    </Box>
  );
}
