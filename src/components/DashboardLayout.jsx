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
import TopupModal from "./Modal";
import ReusableModal from "./ReusableModal";
import { useEffect, useState } from "react";
import { resetAuth } from "reduxStore/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

function DashboardLayout({
  children,
  title = "LukiPay",
  active ,
}) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const logOuthandler = async () => {
    try {
      const logOutResut = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/logout`,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(logOutResut.data.msg);
      setTimeout(() => {
        dispatch(resetAuth());
      }, 1500);
      setModal2(false);
      document.querySelector("body").style.overflow = "visible";
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {modal && <TopupModal setModal={setModal} />}
      {modal2 && (
        <ReusableModal
          title="LogOut"
          bodyInfo="Are you sure want to log out?"
          setModal={setModal2}
          yesHandler={logOuthandler}
        />
      )}

      <Navbar />
      <div className={style.container}>
        <nav className={style.navigation}>
          <div className={style.menuWrapper}>
            <Link href={"/dashboard"}>
              <div
                className={
                  active === "dashboard" ? style.navMenuActive : style.navMenu
                }
              >
                <MdOutlineDashboard className={style.icon} />
                <h2>Dashboard</h2>
              </div>
            </Link>
            <Link href={"/transfer"}>
              <div
                className={
                  active === "transfer" ? style.navMenuActive : style.navMenu
                }
              >
                <MdOutlineArrowUpward className={style.icon} />
                <h2>Transfer</h2>
              </div>
            </Link>

            <div
              className={style.navMenu}
              onClick={() => {
                setModal(true);
                document.querySelector("body").style.overflow = "hidden";
              }}
            >
              <HiOutlinePlus className={style.icon} />
              <h2>Top Up</h2>
            </div>

            <Link href={"/profile"}>
              <div
                className={
                  active === "profile" ? style.navMenuActive : style.navMenu
                }
              >
                <IoPersonOutline className={style.icon} />
                <h2>Profile</h2>
              </div>
            </Link>
          </div>
          <div
            className={style.navMenu}
            onClick={() => {
              setModal2(true);
              document.querySelector("body").style.overflow = "hidden";
            }}
          >
            <MdOutlineLogout className={style.icon} />
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
