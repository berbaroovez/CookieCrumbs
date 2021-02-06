import {
  Box,
  SkeletonText,
  Text,
  Header,
  Heading,
  Code,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
export default function SettingsPage() {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ["/api/getUserInfo", user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <Box
        textAlign="center"
        maxWidth="700px"
        background="white"
        p={4}
        borderRadius={"20px"}
      >
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
    );
  }
  if (data) {
    return (
      <Box
        textAlign="center"
        maxWidth="700px"
        background="white"
        p={4}
        borderRadius={"20px"}
      >
        <Heading>{data.companyName}</Heading>
        <Text>{data.email}</Text>
        <Text>
          Order Form URL:
          <Code>{`https://cookiecrumbs.vercel.app/o/${data.uid}`}</Code>
        </Text>
      </Box>
    );
  }

  return (
    <Box maxWidth="700px">
      <Header>Hello, </Header>
    </Box>
  );
}
