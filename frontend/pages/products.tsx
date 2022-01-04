import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getProductList } from "../services/productDataSource";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Product, ProductCell } from "../components/products/ProductCell";

interface productsProps {}

/**
 * 
 * 
[
    {
        "product": {
            "createdAt": "2022-01-03T18:24:54.354Z",
            "updatedAt": "2022-01-03T10:24:54.418Z",
            "deletedAt": null,
            "version": 1,
            "price": "4.00",
            "name": "Mee",
            "description": "nice mee",
            "id": "33230252-3a34-4130-8313-a093ae81fedd"
        },
        "quantity": 3,
        "total": 12
    },
    {
        "product": {
            "createdAt": "2022-01-03T18:25:23.023Z",
            "updatedAt": "2022-01-03T10:25:23.084Z",
            "deletedAt": null,
            "version": 1,
            "price": "4.13",
            "name": "Mee",
            "description": "nice mee",
            "id": "58c2e80d-579b-4b7b-ae9b-f0586165bc7f"
        },
        "quantity": 4,
        "total": 16.52
    },
    {
        "product": {
            "createdAt": "2022-01-03T18:25:53.459Z",
            "updatedAt": "2022-01-03T10:25:53.516Z",
            "deletedAt": null,
            "version": 1,
            "price": "4.13",
            "name": "Mee",
            "description": "nice mee",
            "id": "4cdae7fe-cae0-4cb4-a91a-3898162abf04"
        },
        "quantity": 2,
        "total": 8.26
    }
]
 * 
 */

const ProductPage: React.FC<productsProps> = ({}) => {
  const [productList, setProductList] = useState<Product[] | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    getProductList()
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          const data = res.data;

          setProductList(data);
        } else {
        }
      })
      .catch((error) => {
        setErrorMsg("Some error when get product");
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Box>
        <Heading>Products</Heading>
      </Box>

      <Flex direction={["column", "column", "row", "row"]} wrap="wrap">
        {productList &&
          productList.map((product, key) => {
            return <ProductCell key={key} product={product} />;
          })}
      </Flex>

      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
    </Layout>
  );
};

export default ProductPage;
