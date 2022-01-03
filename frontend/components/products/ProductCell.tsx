import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  createdAt: string;
};

interface ProductCellProps {
  product: Product;
}

export const ProductCell: React.FC<ProductCellProps> = ({
  product,
}: ProductCellProps) => {
  const { id, name, price, description, createdAt } = product;

  const router = useRouter();

  const goToProductIdPage = () => {
    router.push(`/product/${id}`);
  };
  return (
    <Flex onClick={goToProductIdPage}>
      <Heading>{name}</Heading>

      {description && <Text>{description}</Text>}

      <Heading>{price}</Heading>
    </Flex>
  );
};
