import { Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "@/lib/auth";
export default function NavSignOut() {
  const auth = useAuth();
  return (
    <Flex
      alignItems="center"
      px={5}
      py={3}
      mb={1}
      borderRadius="20px"
      _hover={{
        backgroundColor: "whiteAlpha.500",
      }}
      onClick={auth.signout}
      cursor="pointer"
    >
      <CloseIcon mr={2} />
      <Text fontSize="lg">Sign Out</Text>
    </Flex>
  );
}
