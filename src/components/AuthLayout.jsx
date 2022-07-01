import Head from "next/head";
import React from "react";
import style from "styles/Auth.module.css";
import LoginWave from "assets/IMG/login-wave.svg";
import Link from "next/link";
import Phone from "assets/IMG/dualphone.png";
import Image from "next/image";

function AuthLayout({ children, title = "LukiPay" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={style.wave2}>
        <Image src={LoginWave} layout="" objectFit="fill" quality={100} alt='wave' />
      </div>
      <div className={style.wrapper}>
        <div className={style.section}>
          <div className={style.wave}>
            <Image
              src={LoginWave}
              layout="intrinsic"
              objectFit="cover"
              quality={100}
              alt="wave"
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
                alt="wave"
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
          <header className={style.title2}>
            <Link href={"/"}>LukiPay</Link>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
