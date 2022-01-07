import React from "react";
import Layout from "../../components/layout/Layout";
import { Text } from "@chakra-ui/react";

interface failedProps {}

const FailedCheckoutPage: React.FC<failedProps> = ({}) => {
  return (
    <Layout>
      <Text>Checkout Failed</Text>
    </Layout>
  );
};

export default FailedCheckoutPage;
