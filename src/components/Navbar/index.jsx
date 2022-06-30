import style from "components/styles/Navbar.module.css";
import Link from "next/link";
function Navbar() {
  return (
    <>
      <header className={style.header}>
        <Link href={"/"}>
          <h1 className={style.title}>LukiPay</h1>
        </Link>
        <div className={style.buttonWrapper}>
          <Link href={"/login"}>
            <button className={style.loginbutton}>Login</button>
          </Link>
          <Link href={"/signup"}>
            <button className={style.signupbutton}>Sign Up</button>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;
