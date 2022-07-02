import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/Modal.module.css";

function Modal({ header = "Topup", setModal }) {
  const [amount, setAmount] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errmsg, seterrMsg] = useState("");

  const { token } = useSelector((state) => state.auth);

  const topUpHandler = async () => {
    // console.log(amount.length);
    seterrMsg(false);
    const body = {
      amount: amount,
    };
    try {
      if (amount.length < 1) {
        seterrMsg("The minimum amount is Rp 10.000");
      } else {
        const topUpResult = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/transaction/top-up`,
          data: body,
          headers: { Authorization: `Bearer ${token}` },
        });
        const url = await topUpResult.data.data.redirectUrl;
        seterrMsg(false);
        setSuccessMsg(url);
        // console.log(url);
        window.open(`${url}`);
        setTimeout(() => {
          setModal(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      const err = (await error.response)
        ? error.response.data.msg
        : error.message;
      seterrMsg(err);
    }
  };
  return (
    <div className={style.modal}>
      <main className={style.main}>
        <header className={style.header}>
          <div>{header}</div>
          <div onClick={() => setModal(false)}>X</div>
        </header>
        <body className={style.body}>
          <div className={style.bodyInfo}>
            Enter the amount of money, and click submit
          </div>
          <input
            className={style.number}
            type="number"
            name="amount"
            id="amount"
            placeholder="Minimum amount Rp 10.000"
            min={10000}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          {errmsg ? (
            <div className="alert-danger">{errmsg}</div>
          ) : successMsg ? (
            <div className="alert-success">
              <Link href={successMsg}>
                Click here if not redirected to payment page
              </Link>
            </div>
          ) : (
            <></>
          )}
        </body>
        <footer className={style.footer}>
          <input
            type="submit"
            onClick={topUpHandler}
            disabled={amount.length < 5}
          ></input>
        </footer>
      </main>
    </div>
  );
}

export default Modal;
