import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";

import customTheme from "../../utils/themes";
import Header from "./header";

const Layout: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        direction="column"
        align="center"
        width="100%"
        minH="100%"
        m="0 auto"
        paddingBottom="60px"
      >
        <Header />
        {children}
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
