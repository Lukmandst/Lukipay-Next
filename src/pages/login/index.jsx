import Layout from "components/Layout";
import Head from "next/head";
import Image from "next/image";
import style from "styles/Auth.module.css";
import LoginWave from "assets/IMG/login-wave.svg";
import Phone from "assets/IMG/dualphone.png";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdVisibilityOff,
  MdVisibility,
} from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

function Login() {
  const [eye, setEye] = useState(false);
  return (
    <>
      <Head>
        <title>Login | Lpay</title>
      </Head>
      <div className={style.wrapper}>
        <div className={style.section}>
          <div className={style.wave}>
            <Image
              src={LoginWave}
              layout="intrinsic"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className={style.sectionwrapper}>
            <header className={style.title}>
              <Link href={"/"}>LukiPay</Link>
            </header>
            <div className={style.phone}>
              <Image
                src={Phone}
                layout="responsive"
                objectFit="scale-down"
                height={850}
              />
            </div>
            <div className={style.subinfo}>
              <h3>App that Covering Banking Needs.</h3>
              <p className={style.subinfoP}>
                Zwallet is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in Zwallet everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
        </div>
        <main className={style.main}>
          <header className={style.header}>
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </header>
          <div className={style.info}>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </div>
          <form action="" className={style.form}>
            <div className="input-wrapper">
              <i>
                <MdOutlineEmail />
              </i>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter your e-mail"
              />
            </div>
            <div className="input-wrapper">
              <i>
                <MdLockOutline />
              </i>
              <input
                type={!eye ? "password" : "text"}
                name="pass"
                id=""
                placeholder="Enter your password"
              />
              <eye onClick={() => setEye(!eye)}>
                {!eye ? <MdVisibilityOff /> : <MdVisibility />}
              </eye>
            </div>
          </form>
          <p className={style.forgot}>
            <Link href={"/forgot"}>Forgot your password?</Link>
          </p>
          <input type="submit" value="Login" />
          <p style={{ textAlign: "center" }}>
            Don't have an account? Let's
            <span style={{ color: "#6379f4" }}>
              <Link href={"/signup"}> Sign Up</Link>
            </span>
          </p>
        </main>
      </div>
    </>
  );
}

export default Login;
