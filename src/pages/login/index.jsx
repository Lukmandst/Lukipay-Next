
import style from "styles/Auth.module.css";

import Link from "next/link";
import EmailInput from "components/Input/email";
import PasswordInput from "components/Input/pass";
import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";

function Login() {
  
  return (
    <>
      <AuthLayout title="Login | LukiPay">
        <header className={style.header}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </header>
        <div className={style.info}>
          Transfering money is eassier than ever, you can access FazzPay
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </div>
        <form action="" className={style.form}>
          <EmailInput />
          <PasswordInput />
        </form>
        <p className={style.forgot}>
          <Link href={"/forgot"}>Forgot your password?</Link>
        </p>
        <SubmitBtn value={'Login'}/>
        <p style={{ textAlign: "center" }}>
          Don't have an account? Let's
          <span style={{ color: "#6379f4" }}>
            <Link href={"/signup"}> Sign Up</Link>
          </span>
        </p>
      </AuthLayout>
    </>
  );
}

export default Login;
