import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser } from "../lib/db";

import Router from "next/router";
import { useToast } from "@chakra-ui/react";
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const toast = useToast();
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser, companyName) => {
    if (rawUser) {
      const user = await formatUser(rawUser, companyName);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);

      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signin = async (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        handleUser(response.user);
        Router.push("/dashboard");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Wrong email or password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  //were going to just create user in  sign up too see what happens
  const signup = (email, password, companyName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user, companyName);
      });
  };

  const signout = () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    return firebase
      .auth()
      .confirmPasswordReset(resetCode, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const formatUser = async (user, companyName) => {
  if (companyName) {
    return {
      uid: user.uid,
      email: user.email,
      companyName,
      token: user.ya,
    };
  }
  return {
    uid: user.uid,
    email: user.email,
    token: user.ya,
  };
};
