import "../styles/globals.css";

import "react-datepicker/dist/react-datepicker.css";
import "@/styles/date-picker.css";
import { AuthProvider } from "../lib/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { CSSReset } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
