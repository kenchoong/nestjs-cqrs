import React, { useState, useEffect } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { getPaymentIntentClientSecret } from "../../services/orderDataSource";
import { Text } from "@chakra-ui/react";
import getEnvVars from "../../environment";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

//"pk_test_51K0LJtE9eGZJE2Eo0Wl0tVoe3mcps5ehD92su9vHPR73OwCDydYCZLSZYC4bYDBa6sXBVKqy4XkOv5f0lFtLjWUG00zD53htHV"

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
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}

      {err && <Text>{err}</Text>}
    </div>
  );
}
