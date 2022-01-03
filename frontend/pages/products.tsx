import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getProductList } from "../services/productDataSource";
import { Text } from "@chakra-ui/react";
import { Product, ProductCell } from "../components/products/ProductCell";

interface productsProps {}

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
      {productList &&
        productList.map((product, key) => {
          return <ProductCell key={key} product={product} />;
        })}

      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
    </Layout>
  );
};

export default ProductPage;
