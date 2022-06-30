import style from "components/styles/Footer.module.css";
function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <p>2022 LukiPay. All right reserved.</p>
        <p className={style.footerP}>
          <span>+62 5637 8882 9901</span>
          <span>contact@lukipay.com</span>
        </p>
      </footer>
    </>
  );
}

export default Footer;
