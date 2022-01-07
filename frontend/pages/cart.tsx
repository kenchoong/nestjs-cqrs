import React, { useEffect, useState } from "react";
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
import { createOrder } from "../services/orderDataSource";
import { AuthContextProvider, useAuth } from "../components/users/useAuth";
import { useRouter } from "next/router";

interface cartProps {}

const CartPage: React.FC<cartProps> = ({}) => {
  const {
    processedCartArray,
    setProcessCartArray,
    setCartItemArray,
    cartItemArray,
    processArray,
  } = useCart();

  const {
    grandTotal,
    selectedCartItemArray,
    ifItemExistInSelectedCartItemArray,
    appendToSelectedCartItemArray,
    removeItemFromSelectedCart,
    clearAllItemInSelectedCart,
  } = useSelectedCartItem();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { user } = useAuth();

  console.log("cart", user);

  const router = useRouter();

  /*
  const removeCartItemInOrder = () => {
    if (selectedCartItemArray && cartItemArray) {
      const productArray = cartItemArray.filter(
        (o1) => !selectedCartItemArray.some((o2) => o1.id === o2.product?.id)
      );

      setProcessCartArray(processArray(productArray));
    }
  };*/

  const checkoutAndCreateOrder = () => {
    //const user = localStorage.getItem("lavaUserId");

    //const userId = user && JSON.parse(user).id;
    if (user && selectedCartItemArray && selectedCartItemArray.length > 0) {
      console.log(selectedCartItemArray);

      //console.log(user.userId);
      createOrder(selectedCartItemArray, user.id, grandTotal)
        .then((res) => {
          console.log(res);
          if (res.status !== 201) {
            setErrorMsg("Order not created");
          } else {
            //removeCartItemInOrder();

            const orderId = res.data.id;

            router.push(`/checkout/${orderId}`);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("Some error occured from server ");
        });
    } else {
      setErrorMsg("Have select at least 1 cart item to checkout");
    }
  };

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
        {errorMsg && (
          <Text mt={4} mb={4} color="red" fontWeight="bold">
            {errorMsg}
          </Text>
        )}

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
              onClick={() => checkoutAndCreateOrder()}
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
