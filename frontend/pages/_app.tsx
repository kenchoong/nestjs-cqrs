import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartContextProvider } from "../components/cart/useCart";
import { SeletectedCartItemContextProvider } from "../components/cart/useSelectedCartItem";
import { AuthContextProvider } from "../components/users/useAuth";
import "./App.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <SeletectedCartItemContextProvider>
          <Component {...pageProps} />
        </SeletectedCartItemContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
