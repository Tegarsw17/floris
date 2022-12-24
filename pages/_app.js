import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Template from "../components/template";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Floris</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
