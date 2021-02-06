import { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";
import Signup from "../components/Signup";
import SignIn from "../components/SignIn";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const auth = useAuth();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const test = () => {
    if (auth.user) {
      console.log(auth.user.email);
    } else {
      console.log(":(");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        textAlign="center"
        background="teal.100"
        mb={8}
        p={8}
        borderRadius="20px"
      >
        <Heading>Cookie Crumbs</Heading>
        <Text fontSize="lg">
          Your one stop shop for tracking and managing your cookie orders
        </Text>
      </Box>
      <Box>
        <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>
          Sign Up Today!
        </Text>
        <Signup />
      </Box>
    </div>
  );
}
