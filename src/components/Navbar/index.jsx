import style from "components/styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import NavbarAfterLogin from "./NavbarAfterLogin";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  return (
    <header className={style.header}>
      <Link href={"/"}>
        <h1 className={style.title}>LukiPay</h1>
      </Link>
      {!token ? (
        <div className={style.buttonWrapper}>
          <Link href={"/login"}>
            <button className={style.loginbutton}>Login</button>
          </Link>
          <Link href={"/signup"}>
            <button className={style.signupbutton}>Sign Up</button>
          </Link>
        </div>
      ) : (
        <NavbarAfterLogin />
      )}
    </header>
  );
}
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
