import Head from "next/head";
import { HiOutlinePlus } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import {
  MdOutlineArrowUpward,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import Footer from "./Footer";
import Navbar from "./Navbar";
import style from "styles/Dashboard.module.css";
import Link from "next/link";

function DashboardLayout({ children, title = "LukiPay" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className={style.container}>
        <nav className={style.navigation}>
          <div className={style.menuWrapper}>
            <Link href={"/dashboard"}>
              <div className={style.navMenu}>
                <MdOutlineDashboard />
                <h2>Dashboard</h2>
              </div>
            </Link>
            <Link href={"/transfer"}>
              <div className={style.navMenu}>
                <MdOutlineArrowUpward />
                <h2>Transfer</h2>
              </div>
            </Link>
            <Link href={"/topup"}>
              <div className={style.navMenu}>
                <HiOutlinePlus />
                <h2>Top Up</h2>
              </div>
            </Link>
            <Link href={"/profile"}>
              <div className={style.navMenu}>
                <IoPersonOutline />
                <h2>Profile</h2>
              </div>
            </Link>
          </div>
          <div className={style.navMenu}>
            <MdOutlineLogout />
            <h2>Log Out</h2>
          </div>
        </nav>
        <main className={style.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
