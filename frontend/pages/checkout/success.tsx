import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { getOrderById } from "../../services/orderDataSource";

interface successProps {}

const SuccessCheckoutPage: React.FC<successProps> = ({}) => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderId = localStorage.getItem("lavaxOrderId");

    if (orderId) {
      getOrderById(orderId)
        .then((res) => {
          setOrder(res.data);
        })
        .catch((error) => {
          setOrder(null);
        });
    }
  }, []);

  return (
    <Layout>
      <Text>Checkout success</Text>

      {order && (
        <Flex direction="column">
          <Text fontWeight="bold" mt={4}>
            The order Id just now {order.id}
          </Text>

          <Text mt={4}>The order status: {order.orderStatus}</Text>

          <Text mt={4}>
            Note: This is fetch from server, just to show u the payment status
            of an order already update
          </Text>
        </Flex>
      )}

      <NextLink passHref href="/products">
        <Button colorScheme="red" mt={4}>
          Back to home
        </Button>
      </NextLink>
    </Layout>
  );
};

export default SuccessCheckoutPage;
