import { createContext, useContext, useEffect, useState } from "react";
import { ProcessedCart, useCart } from "./useCart";

export interface SelectedCartItemContextInterface {
  /**
   * @param ProductId
   * @description Check whether the product exist in the selected array
   */
  ifItemExistInSelectedCartItemArray: (productId: string) => boolean;

  /**
   * @description array to record which cart item is selected
   */
  selectedCartItemArray: ProcessedCart[] | null;

  /**
   * @description add a new selected item into cart array
   */
  appendToSelectedCartItemArray: (productId: string) => void;

  /**
   * @description remove selected item from the array
   */
  removeItemFromSelectedCart: (productId: string) => void;

  /**
   * @description clear all item
   */
  clearAllItemInSelectedCart: () => void;

  /**
   * @description grand total number of the selected item
   */
  grandTotal: number;
}

const defaultValue = {};

const SeletectedCartItemContext =
  createContext<SelectedCartItemContextInterface>(
    defaultValue as SelectedCartItemContextInterface
  );

interface SeletectedCartItemContextProviderProps {
  children: React.ReactNode;
}

const useSelectedCartItem = () => {
  return useContext(SeletectedCartItemContext);
};

const SeletectedCartItemContextProvider = (
  props: SeletectedCartItemContextProviderProps
) => {
  const cart = useSelectedCartOperation();

  return (
    <SeletectedCartItemContext.Provider value={cart}>
      {props.children}
    </SeletectedCartItemContext.Provider>
  );
};

function useSelectedCartOperation() {
  const { processedCartArray } = useCart();

  const [selectedCartItemArray, setSelectedCartItemArray] = useState<
    ProcessedCart[]
  >([]);

  const ifItemExistInSelectedCartItemArray = (id: string): boolean => {
    return (
      selectedCartItemArray.filter((item) => item.product?.id === id).length > 0
    );
  };

  const [grandTotal, setGrandTotal] = useState<number>(0);

  const findItemInCartByProductId = (
    array: ProcessedCart[],
    productId: string
  ): ProcessedCart | undefined => {
    return array && array.find((item) => item.product?.id === productId);
  };

  const removeItemFromSelectedCart = (productId: string) => {
    setSelectedCartItemArray(
      selectedCartItemArray.filter((item) => item.product?.id !== productId)
    );
  };

  const appendToSelectedCartItemArray = (productId: string) => {
    const selectedCartItem =
      processedCartArray &&
      findItemInCartByProductId(processedCartArray, productId);

    selectedCartItem &&
      setSelectedCartItemArray((selectedCartItemArray) => [
        ...selectedCartItemArray,
        selectedCartItem,
      ]);
  };

  const clearAllItemInSelectedCart = () => {
    setSelectedCartItemArray([]);
  };

  useEffect(() => {
    if (selectedCartItemArray) {
      if (selectedCartItemArray.length === 0) {
        setGrandTotal(0);
      }
      const rel = selectedCartItemArray
        .map(function (item) {
          return item.total;
        })
        .reduce(function (a, b) {
          //@ts-expect-error
          return a + b;
        }, 0);

      //@ts-expect-error
      const myTotal = Number((Math.round(rel * 100) / 100).toFixed(2));
      rel && setGrandTotal(myTotal);
    }
  }, [selectedCartItemArray]);

  return {
    grandTotal,
    ifItemExistInSelectedCartItemArray,
    selectedCartItemArray,
    setSelectedCartItemArray,
    appendToSelectedCartItemArray,
    removeItemFromSelectedCart,
    clearAllItemInSelectedCart,
  };
}

export {
  useSelectedCartItem,
  SeletectedCartItemContext,
  SeletectedCartItemContextProvider,
};
