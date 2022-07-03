import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import style from "./styles/Modal.module.css";

function ModalPin({
  header = "Enter PIN to Transfer",
  setModal,
  amount,
  receiverId,
  notes,
}) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errmsg, seterrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPinCode] = useState("");

  const { token } = useSelector((state) => state.auth);

  const handlePinChange = (pin) => {
    setPinCode(pin);
  };
  const checkPinHandler = async () => {
    // console.log(amount.length);
    seterrMsg(false);
    setLoading(false);
    try {
      if (pin.length < 6) {
        seterrMsg("Please input your pin!");
      } else {
        setLoading(true);
        const pinResult = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/user/pin?pin=${pin}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(pinResult.data);
        setLoading(false);
        seterrMsg(false);
        setSuccessMsg(pinResult.data.msg + "payment will be processed soon");

        setTimeout(async () => {
          setLoading(false);
          seterrMsg(false);
          setSuccessMsg(false);
          const body = {
            receiverId: receiverId,
            amount: amount,
            notes: notes,
          };
          const transferResult = await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST_API}/transaction/transfer`,
            data: body,
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(transferResult);
          setLoading(false);
          seterrMsg(false);
          setSuccessMsg(transferResult.data.msg);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      const err = (await error.response)
        ? error.response.data.msg
        : error.message;
      seterrMsg(err);
      setLoading(false);
    }
  };
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
          <div className={style.bodyInfo}>
            Enter your 6 digits PIN for confirmation to continue transfering
            money.
          </div>
          <ReactCodeInput
            className={style.reactPIN}
            id="pinCode"
            type="password"
            fields={6}
            onChange={handlePinChange}
            value={pin}
          />
          {errmsg ? (
            <div className="alert-danger">{errmsg}</div>
          ) : successMsg ? (
            <div className="alert-success">{successMsg}</div>
          ) : (
            <></>
          )}
        </body>
        {loading ? (
          <Loading />
        ) : (
          <footer className={style.footer}>
            <input
              type="submit"
              onClick={checkPinHandler}
              disabled={pin.length < 6}
            />
          </footer>
        )}
      </main>
    </div>
  );
}

export default ModalPin;
