import API from "./api";

export const getProductList = () => {
  const path = "/product";

  return API.get(path);
};

export const getProductById = (productId: string) => {
  const path = "/product/" + productId;

  return API.get(path);
};
