import Navbar from "components/Navbar";
import Head from "next/head";
import Image from "next/image";
import style from "styles/Home.module.css";
import Wave from "assets/IMG/landing-page-wave.svg";


export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LukiPay</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Navbar />
      <section className={style.section1}>
        <main className={style.section1main}>
          <h1>
            Awesome App For Saving<span>Time.</span>
          </h1>
          <p className="">
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>
          <button className={style.section1btn}>Try It Free</button>
        </main>
        <section className={style.section1side}>
          <Image src={Wave} objectPosition="absolute" alt='wave' />
        </section>
      </section>
      <footer className={style.footer}>
        <h3>Fazzpay</h3>
        <p className={style.footerinfo}>
          Simplify financial needs and saving much time in banking needs with
          one single app.
        </p>
        <div className={style.bottom}>
          <p>2020 LukiPay. All right reserved.</p>
          <p>
            <span>+62 5637 8882 9901</span> <span>contact@lukipay.com</span>
          </p>
        </div>
      </footer>
    </>
  );
}
