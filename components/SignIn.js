import { useAuth } from "../lib/auth";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function SignIn() {
  const [resetPass, setResetPass] = useState(null);

  const auth = useAuth();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    auth.signin(inputEmail.current.value, inputPassword.current.value);
    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };

  const onSubmitResetPass = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(inputEmail.current.value);
    inputEmail.current.value = "";
  };
  return (
    <Box p={8}>
      {resetPass ? (
        <Box as="form" onSubmit={onSubmitResetPass}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" ref={inputEmail} />

            <Button mt={4} type="submit" colorScheme="teal" fontWeight="medium">
              Reset
            </Button>
          </FormControl>
        </Box>
      ) : (
        <Box as="form" onSubmit={onSubmitSignIn}>
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
      )}

      <Text
        textAlign="center"
        fontSize="xs"
        onClick={() => {
          setResetPass(!resetPass);
        }}
        _hover={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Forgot Password?
      </Text>
    </Box>
  );
}
