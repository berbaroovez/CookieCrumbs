import { Box, Flex } from "@chakra-ui/layout";
import SignIn from "../components/SignIn";
import IndexNavBar from "@/components/IndexNavBar";

export default function SignInPage() {
  return (
    <>
      <IndexNavBar />
      <Flex backgroundColor="blackAlpha.100" justifyContent="center" pt={32}>
        <Box w={"500px"} background="white" borderRadius="20px">
          <SignIn />
        </Box>
      </Flex>
    </>
  );
}
