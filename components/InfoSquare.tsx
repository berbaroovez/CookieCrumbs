import { Box, Text, Stack } from "@chakra-ui/react";

export default function InfoSquare({ title, children, ...props }) {
  return (
    <Box {...props} background="white" w={44} h={24} borderRadius="20px" p={4}>
      <Stack direction="column" textAlign="center">
        <Text fontWeight="600">{title}</Text>
        <Text>{children}</Text>
      </Stack>
    </Box>
  );
}
