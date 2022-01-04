import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartContextProvider } from "../components/cart/useCart";
import { SeletectedCartItemContextProvider } from "../components/cart/useSelectedCartItem";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <SeletectedCartItemContextProvider>
        <Component {...pageProps} />
      </SeletectedCartItemContextProvider>
    </CartContextProvider>
  );
}

export default MyApp;
