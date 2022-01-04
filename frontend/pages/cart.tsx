import React, { useEffect } from "react";
import { useCart } from "../components/cart/useCart";
import Layout from "../components/layout/Layout";
import {
  Button,
  Flex,
  Heading,
  Text,
  Table,
  Th,
  Tr,
  Td,
  Tbody,
  Thead,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { ProductCell } from "../components/products/ProductCell";
import { useSelectedCartItem } from "../components/cart/useSelectedCartItem";

interface cartProps {}

const CartPage: React.FC<cartProps> = ({}) => {
  const { processedCartArray } = useCart();

  const {
    grandTotal,
    selectedCartItemArray,
    ifItemExistInSelectedCartItemArray,
    appendToSelectedCartItemArray,
    removeItemFromSelectedCart,
    clearAllItemInSelectedCart,
  } = useSelectedCartItem();

  const handleCheckboxChange = (event: any) => {
    if (event.target.checked) {
      if (!ifItemExistInSelectedCartItemArray(event.target.value)) {
        appendToSelectedCartItemArray(event.target.value);
      }
    } else {
      removeItemFromSelectedCart(event.target.value);
    }
  };

  useEffect(() => {
    clearAllItemInSelectedCart();
  }, []);

  return (
    <Layout>
      <Flex width={["90%", "80%", "50%", "50%"]} direction="column">
        <Flex width="100%" justify="space-between">
          <Heading>Item in Cart</Heading>
        </Flex>

        {processedCartArray && processedCartArray.length > 0 ? (
          <Table variant="simple" mt={8}>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Quantity</Th>
                <Th>Product</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {processedCartArray.map((product, key) => (
                <Tr key={key}>
                  {product.product && (
                    <Td>
                      <Checkbox
                        id={product.product.id}
                        value={product.product.id}
                        onChange={handleCheckboxChange}
                      />
                    </Td>
                  )}
                  <Td>{product.quantity} pcs</Td>
                  <Td>
                    {product.product && (
                      <ProductCell isCart={true} product={product.product} />
                    )}
                  </Td>
                  <Td>RM {product.total}</Td>
                </Tr>
              ))}

              <Tr>
                <Td></Td>
                <Td></Td>
                <Td>Total: </Td>
                <Td>
                  RM{" "}
                  {selectedCartItemArray
                    ? selectedCartItemArray.length > 0
                      ? grandTotal
                      : 0
                    : 0}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        ) : (
          <Text mt={8} fontWeight="bold">
            No item in cart
          </Text>
        )}

        {processedCartArray && processedCartArray.length > 0 && (
          <Box mt={4}>
            <Button
              float="right"
              colorScheme="red"
              onClick={() => console.log(selectedCartItemArray)}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default CartPage;
