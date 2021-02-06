import { useAuth } from "../lib/auth";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function SignIn() {
  const auth = useAuth();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      auth.signin(inputEmail.current.value, inputPassword.current.value);
    } catch (err) {
      console.log("err", err);
    }
    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };
  return (
    <Box as="form" onSubmit={onSubmit} p={8}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" ref={inputEmail} />

        <FormLabel>Password</FormLabel>
        <Input type="password" ref={inputPassword} />

        <Button mt={4} type="submit" colorScheme="teal" fontWeight="medium">
          Sign In
        </Button>
      </FormControl>
    </Box>
  );
}
