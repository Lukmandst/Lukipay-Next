import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/Modal.module.css";

function ReusableModal({
  header = "LukiPay",
  bodyInfo = "Input Body Message",
  setModal,
  yesHandler,
}) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errmsg, seterrMsg] = useState("");

  return (
    <div className={style.modal}>
      <main className={style.main}>
        <header className={style.header}>
          <div>{header}</div>
          <div
            onClick={() => {
              setModal(false);
              document.querySelector("body").style.overflow = "visible";
            }}
          >
            X
          </div>
        </header>
        <body className={style.body}>
          <div className={style.bodyInfo}>{bodyInfo}</div>
        </body>
        <footer className={style.footer}>
          <input
            type="submit"
            className={style.secondary}
            onClick={() => {
              setModal(false);
              document.querySelector("body").style.overflow = "visible";
            }}
            value="No"
          ></input>
          <input type="submit" onClick={yesHandler} value="Yes"></input>
        </footer>
      </main>
    </div>
  );
}

export default ReusableModal;
