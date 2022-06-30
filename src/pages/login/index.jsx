import style from "styles/Auth.module.css";

import Link from "next/link";
import EmailInput from "components/Input/email";
import PasswordInput from "components/Input/pass";
import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "reduxStore/actions/authActions";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const loginHandler = () => {
    const body = {
      email: email,
      password: pass,
    };
    console.log(body);
    dispatch(authLogin(body));
  };
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
        <div className={style.formwrapper}>
          <form onSubmit={() => loginHandler} className={style.form1}>
            <EmailInput setEmail={setEmail} />
            <PasswordInput setPass={setPass} />
          </form>
          <p className={style.forgot}>
            <Link href={"/forgotpass"}>Forgot your password?</Link>
          </p>
          <SubmitBtn value={"Login"} onClick={loginHandler} />
          <p style={{ textAlign: "center" }}>
            Don't have an account? Let's
            <span style={{ color: "#6379f4" }}>
              <Link href={"/signup"}> Sign Up</Link>
            </span>
          </p>
        </div>
        
      </AuthLayout>
    </>
  );
}

export default Login;
