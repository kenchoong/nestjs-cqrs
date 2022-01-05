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
