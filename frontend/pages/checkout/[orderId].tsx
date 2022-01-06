import { Button, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getCheckoutUrl, getOrderById } from "../../services/orderDataSource";
import NextLink from "next/link";
import StripePaymentComponent from "../../components/payment/StripePaymentComponent";

interface checkoutProps {}

const CheckoutPage: React.FC<checkoutProps> = ({}) => {
  const router = useRouter();

  const { orderId } = router.query;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      localStorage.setItem("lavaxOrderId", orderId.toString());

      getOrderById(orderId.toString())
        .then((res) => {
          console.log(res.data);
          setOrder(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  const checkout = () => {
    getCheckoutUrl(order.id)
      .then((res) => {
        if (res.status !== 201) console.log("abc");

        const url = res.data.url;
        router.push(url);
      })
      .catch((error) => {
        console.log(error);
        console.log("Cant checkout");
      });
  };

  return (
    <Layout>
      {order && (
        <Flex direction="column">
          <Heading size="md">Your orderId: {order.id}</Heading>
          <Flex mt={8} mb={8} justify="space-between">
            <Heading size="sm">Item in order</Heading>

            <Text color="blue" fontWeight="bold">
              Status: {order.orderStatus}
            </Text>
          </Flex>

          <Flex mt={8} direction="column">
            {order &&
              order.orderProduct.map((products: any, key: number) => {
                return (
                  <Flex key={key} mt={4} mb={4}>
                    <Text mr={8}> {key + 1}. </Text>
                    <Text mr={8}>{products.quantity} pcs</Text>

                    <NextLink passHref href={`/product/${products.product.id}`}>
                      <Link>
                        <Text fontWeight="bold" mr={8}>
                          {products.product.name}
                        </Text>
                      </Link>
                    </NextLink>

                    <Text mr={8}>Unit price: RM {products.product.price}</Text>
                    <Text mr={8}>Total: RM{products.productTotal}</Text>
                  </Flex>
                );
              })}
          </Flex>

          <Text size="md" mt={8}>
            Grand total : RM {order.grandTotal}
          </Text>

          <Flex mt={8}>
            <StripePaymentComponent orderId={order.id} />
          </Flex>

          {/*<Button colorScheme="green" mt={8} onClick={() => checkout()}>
            Pay
            </Button>*/}
        </Flex>
      )}
    </Layout>
  );
};

export default CheckoutPage;
