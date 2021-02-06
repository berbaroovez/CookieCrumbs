import { Input } from "@chakra-ui/react";

export default function Searchbar({ ...rest }) {
  return (
    <Input
      {...rest}
      type="text"
      placeholder="search orders"
      background="grey.100"
      maxW={"510px"}
      mb={4}
    />
  );
}
