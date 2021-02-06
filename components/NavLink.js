import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";

export default function NavLink({ pageRoute, children }) {
  return (
    <NextLink href={`/${pageRoute}`} passHref>
      <Link style={{ textDecoration: "none" }}>
        <Flex
          alignItems="center"
          px={5}
          py={3}
          mb={1}
          borderRadius="20px"
          _hover={{
            backgroundColor: "whiteAlpha.500",
          }}
        >
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
}
