import { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";
import Signup from "../components/Signup";
import SignIn from "../components/SignIn";
import { FaStroopwafel } from "react-icons/fa";
import { Box, Heading, Text, Icon } from "@chakra-ui/react";
import IndexNavBar from "@/components/IndexNavBar";

export default function Home() {
  return (
    <>
      <IndexNavBar />
      <div className={styles.container}>
        <Head>
          <title>Cookie Crumbs | Order Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          textAlign="center"
          background="teal"
          mb={8}
          p={8}
          mt={16}
          borderRadius="20px"
          color="white"
        >
          <Icon as={FaStroopwafel} w={8} h={8} />
          <Heading>Cookie Crumbs</Heading>
          <Text fontSize="lg">
            Your one stop shop for tracking and managing your cookie orders
          </Text>
        </Box>
        <Box mb={8}>
          <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>
            Sign Up Today!
          </Text>
          <Signup />
        </Box>
      </div>
    </>
  );
}
