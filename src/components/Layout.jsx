import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, title = "LukiPay" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
