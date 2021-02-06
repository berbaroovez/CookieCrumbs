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
export default function Signup() {
  const auth = useAuth();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputCompanyName = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    auth.signup(
      inputEmail.current.value,
      inputPassword.current.value,
      inputCompanyName.current.value
    );
    inputEmail.current.value = "";
    inputPassword.current.value = "";
    inputCompanyName.current.value = "";
  };
  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" ref={inputEmail} />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <FormLabel>Password</FormLabel>
        <Input type="password" ref={inputPassword} />
        <FormHelperText>Make it unique!</FormHelperText>
        <FormLabel>Company Name</FormLabel>
        <Input
          type="text"
          ref={inputCompanyName}
          placeholder="148 Cookie Street"
        />
        <FormHelperText>Let us know your companys name!</FormHelperText>
        <Button mt={4} type="submit" fontWeight="medium">
          Sign Up
        </Button>
      </FormControl>
    </Box>
  );
}
