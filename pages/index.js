import { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";
import Signup from "../components/Signup";
import SignIn from "../components/SignIn";

import { Button } from "@chakra-ui/react";

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

      <Signup />

      <SignIn />
      <h1>{auth.user ? auth.user.email : "none"}</h1>
      <h1>{auth.user ? auth.user.token : "none"}</h1>
      <Button onClick={auth.printuser}>print</Button>
      <Button onClick={test}>test</Button>
      <Button onClick={auth.signout}>Sign out</Button>
    </div>
  );
}
