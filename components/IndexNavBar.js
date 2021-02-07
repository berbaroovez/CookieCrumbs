import { FaStroopwafel } from "react-icons/fa";
import { Box, Text, Icon, Flex, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAuth } from "../lib/auth";
export default function IndexNavBar() {
  const { user } = useAuth();
  return (
    <Box
      w="100%"
      background="teal"
      color="white"
      p={2}
      boxShadow="xl"
      pos="fixed"
    >
      <Flex justifyContent="space-between" px={4}>
        <Flex alignItems="center">
          <NextLink href="/" passHref>
            <Link>
              <Icon as={FaStroopwafel} w={[6, 8]} h={[6, 8]} />
            </Link>
          </NextLink>

          <Text ml={2} fontWeight="bold" fontSize={["xs", "xl"]}>
            Cookie Crumbs
          </Text>
        </Flex>
        <Flex alignItems="center">
          <NextLink href="/learn" passHref>
            <Link>
              <Text mr={[4, 8]} fontWeight="bold" fontSize={["xs", "xl"]}>
                Learn More
              </Text>
            </Link>
          </NextLink>
          {user ? (
            <NextLink href="/dashboard" passHref>
              <Link>
                <Button color="teal" size="sm">
                  Dashboard
                </Button>
              </Link>
            </NextLink>
          ) : (
            <NextLink href="/signin" passHref>
              <Link>
                <Button color="teal" size="sm">
                  Sign In
                </Button>
              </Link>
            </NextLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
