import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface headerProps {}

const Header: React.FC<headerProps> = ({}) => {
  return (
    <Flex width="100%" justify="space-between" m={4} p={8}>
      <NextLink href="/products" passHref>
        <Link>
          <Heading>LavaStuff</Heading>
        </Link>
      </NextLink>

      <Flex>
        <NextLink href="/cart" passHref>
          <Button mr={4} colorScheme="green">
            Cart
          </Button>
        </NextLink>

        <NextLink href="/orders" passHref>
          <Button mr={4} colorScheme="red">
            My Order
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Header;
