import { Box, Button, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import { useCart } from "../cart/useCart";

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  createdAt: string;
};

interface ProductCellProps {
  isSingleItem?: boolean;
  isCart?: boolean;
  product: Product;
}

export const ProductCell: React.FC<ProductCellProps> = ({
  isSingleItem,
  isCart,
  product,
}: ProductCellProps) => {
  const { appendProductToCart } = useCart();
  const { id, name, price, description, createdAt } = product;

  const calcalateTime = (date: string) => {
    const timestamp = Date.parse(date);

    const myDate = new Date(timestamp);

    const date1 = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();

    return date1.toString() + "-" + month.toString() + "-" + year.toString();
  };

  return (
    <Flex
      direction="column"
      m={8}
      p={8}
      borderWidth="4px"
      borderColor="black"
      borderRadius="xl"
    >
      {(isSingleItem || isCart) && <Text>ProductId: {id}</Text>}

      {!isSingleItem ? (
        <NextLink href={`/product/${id}`} passHref>
          <Link>
            <Heading>{name}</Heading>
          </Link>
        </NextLink>
      ) : (
        <Heading>{name}</Heading>
      )}

      {description && (
        <Text mt={4} fontSize="xl">
          {description}
        </Text>
      )}

      <Text mt={4} fontSize="xl" fontWeight="bold">
        RM {price}
      </Text>

      {isSingleItem && (
        <Text mt={4}>Product Created At: {calcalateTime(createdAt)}</Text>
      )}

      {!isCart && (
        <Button
          colorScheme="teal"
          mt={4}
          onClick={() => {
            appendProductToCart(product);
          }}
        >
          Add to cart
        </Button>
      )}
    </Flex>
  );
};
