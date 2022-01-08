import React, { useState, useEffect } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { getPaymentIntentClientSecret } from "../../services/orderDataSource";
import { Flex, Text } from "@chakra-ui/react";
import getEnvVars from "../../environment";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export interface PaymentComponentInterface {
  orderId: string;
}

export default function StripePaymentComponent({
  orderId,
}: PaymentComponentInterface) {
  const [clientSecret, setClientSecret] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const stripePromise = loadStripe(
    getEnvVars().NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    getPaymentIntentClientSecret(orderId)
      .then((res) => {
        if (res.status === 201) {
          setClientSecret(res.data.clientSecret);
        } else {
          setErr("Cant get client secret");
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  const appearance: Appearance = {
    theme: "night",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: appearance,
  };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <Flex direction="column">
          <Text>
            Here you need to add Stripe Secret key in backend/.env and
          </Text>
          <Text>
            Stripe Publishable key in frontend/.env, please refer to README for
            more info,
          </Text>
          <Text> right not you cant get the Client secret</Text>
        </Flex>
      )}

      {err && <Text>{err}</Text>}
    </div>
  );
}
