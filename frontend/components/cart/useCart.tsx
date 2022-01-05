import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
} from "react";
import { Product } from "../products/ProductCell";

/**
 * @description Custom hook to interact with LocalStorage
 * @param defaultValue
 * @param key
 * @returns
 */
export function useLocalStorageState(defaultValue: [], key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue: string | false | null =
      typeof window !== "undefined" && window.localStorage.getItem(key);
    return stickyValue !== null && typeof stickyValue === "string"
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export interface ProcessedCart {
  product?: Product | undefined;
  quantity?: number;
  total?: number | undefined;
}

/**
 * @description Defined dataArray, method, that will exists in Cart
 */
export interface CartContextInterface {
  /**
   * @description Array that contain all product in cart
   */
  cartItemArray: Product[] | null;

  setCartItemArray: Dispatch<Product[] | null>;

  /**
   * @description Manipulate cart array to array that presentable to user AKA remove
   */
  processArray: (dataArray: any) => ProcessedCart[];

  /**
   * @description Processed array, to present to user
   */
  processedCartArray: ProcessedCart[] | null;

  setProcessCartArray: Dispatch<ProcessedCart[] | null>;

  /**
   * @description add a product object into CartItemArry
   * @param Product object
   */
  appendProductToCart: (productObject: Product) => void;

  /**
   * @description direct clear all product inside CartItemArray
   */
  clearAllProductFromCart: () => void;
}

/**@description the default value of the context, normally is blank object */
const defaultValue = {};

/**
 * @description Typical createContext method of React
 */
const CartContext = createContext<CartContextInterface>(
  defaultValue as CartContextInterface
);

/**
 * @description The props for the React context provider, it will be a childrem
 */
interface CartContextProviderProps {
  children: React.ReactNode;
}

/**
 * @description React context provider, to wrap the children
 * @param CartContextProviderProps aka Children
 * @returns ReactContextProvider
 */
const CartContextProvider = (props: CartContextProviderProps) => {
  const cart = useCartOperation();

  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

/**
 * @description useContext method of the React
 * @returns all the details, method inside the cart
 */
const useCart = () => {
  return useContext(CartContext);
};

/**
 * @description The actual operation of useCart hooks, all method will defined here
 * @returns An object, contain all the dataArray, value, method of useCart hooks
 */
function useCartOperation() {
  const [cartItemArray, setCartItemArray] = useLocalStorageState(
    [],
    "lavaxCartItemArray"
  );

  const [processedCartArray, setProcessCartArray] = useState<
    ProcessedCart[] | null
  >(null);

  const appendProductToCart = (productObject: Product) => {
    setCartItemArray((cartItemArray: []) => [...cartItemArray, productObject]);
  };

  const clearAllProductFromCart = () => {
    setCartItemArray([]);
  };

  function ensure<T>(
    argument: T | undefined | null,
    message: string = "This value was promised to be there."
  ): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }

    return argument;
  }

  const processArray = (dataArray: Product[]): ProcessedCart[] => {
    // here unique item
    const arrayProcessed = Array.from(
      new Set(dataArray.map((item: any) => item.id))
    ).map((id) => {
      return {
        product: dataArray.find((s: any) => s.id === id),
        quantity: dataArray.filter((x: any) => x.id === id).length,
        total:
          ensure(dataArray.find((s: any) => s.id === id)).price *
          dataArray.filter((x: any) => x.id === id).length,
      };
    });

    //setProcessCartArry(myArry);
    return arrayProcessed;
  };

  useEffect(() => {
    if (cartItemArray) {
      setProcessCartArray(processArray(cartItemArray));
    }
  }, [cartItemArray]);

  /**
   * @description final return all the stuff
   */
  return {
    cartItemArray,
    setCartItemArray,
    processArray,
    processedCartArray,
    setProcessCartArray,
    appendProductToCart,
    clearAllProductFromCart,
  };
}

export { useCart, CartContext, CartContextProvider };
