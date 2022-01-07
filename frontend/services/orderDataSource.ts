import { ProcessedCart } from "../components/cart/useCart";
import API from "./api";

export const createOrder = (
  selectedCartItems: ProcessedCart[],
  userId: string,
  grandTotal: number
) => {
  const path = "/orders";

  const body = {
    userId: userId,
    grandTotal: grandTotal,
    orderProduct: selectedCartItems,
  };

  return API.post(path, body);
};

export const getOrderById = (orderId: string) => {
  return API.get("/orders/" + orderId);
};

export const getOrders = () => {
  return API.get("/orders");
};

export const getCheckoutUrl = (orderId: string) => {
  const body = {
    orderId: orderId,
  };

  return API.post("/payment/checkout-out-session", body);
};

export const getPaymentIntentClientSecret = (orderId: string) => {
  const body = {
    orderId: orderId,
  };

  return API.post("/payment/create-payment-intent", body);
};
