import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/flightItem.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
