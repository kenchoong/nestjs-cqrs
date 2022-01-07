import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCart } from "../../components/cart/useCart";
import Layout from "../../components/layout/Layout";
import { Product, ProductCell } from "../../components/products/ProductCell";
import { getProductById } from "../../services/productDataSource";

interface productIdProps {}

const ProductIdPage: React.FC<productIdProps> = ({}) => {
  const router = useRouter();
  const { appendProductToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { productId } = router.query;

  console.log(productId);

  useEffect(() => {
    if (productId) {
      getProductById(productId as string)
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            setProduct(res.data);
          } else {
            setProduct(null);
          }
        })
        .catch((error) => {
          setErrorMsg("Some error in our server");
        });
    }
  }, [productId]);

  return (
    <Layout>
      {product ? (
        <ProductCell isSingleItem={true} product={product} />
      ) : (
        <Text>Product not found</Text>
      )}

      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
    </Layout>
  );
};

export default ProductIdPage;
