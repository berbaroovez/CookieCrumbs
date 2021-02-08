import { useEffect } from "react";
import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function NavLink({ pageRoute, children, ...rest }) {
  const router = useRouter();

  return (
    <NextLink href={`/${pageRoute}`} {...rest} passHref>
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
          fontWeight={router.pathname === `/${pageRoute}` ? "bold" : "normal"}
        >
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
}
