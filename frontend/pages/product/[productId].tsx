import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Product } from "../../components/products/ProductCell";
import { getProductById } from "../../services/productDataSource";

interface productIdProps {}

const ProductIdPage: React.FC<productIdProps> = ({}) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  const { productId } = router.query;

  console.log(productId);

  useEffect(() => {
    if (productId) {
      getProductById(productId as string)
        .then((res) => {
          console.log(res);

          setProduct(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productId]);

  return (
    <Layout>
      {product && (
        <Flex direction="column">
          <Heading>{product.name}</Heading>

          <Text>{product.description}</Text>

          <Text>{product.price}</Text>

          <Button colorScheme="teal" onClick={() => console.log(product.id)}>
            Add to Cart
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default ProductIdPage;
