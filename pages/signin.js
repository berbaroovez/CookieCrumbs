import { Box, Flex } from "@chakra-ui/layout";
import SignIn from "../components/SignIn";

export default function SignInPage() {
  return (
    <Flex backgroundColor="blackAlpha.100" justifyContent="center" mt={32}>
      <Box w={"500px"} background="white" borderRadius="20px">
        <SignIn />
      </Box>
    </Flex>
  );
}
