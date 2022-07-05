import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));
import style from "styles/Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { resetAuth } from "reduxStore/actions/authActions";

function CreatePin() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errmsg, seterrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPinCode] = useState("");

  const { token, id, pin: userPin } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePinChange = (pin) => {
    setPinCode(pin);
  };

  const createPin = async () => {
    setLoading(false);
    seterrMsg(false);
    setSuccessMsg(false);
    const body = {
      pin: pin,
    };
    try {
      setLoading(true);
      const createPinResult = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/user/pin/${id}`,
        data: body,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(createPinResult);
      setLoading(false);
      seterrMsg(false);
      setSuccessMsg(createPinResult.data.msg + " Please Log In again !");
      setTimeout(() => {
        dispatch(resetAuth());
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }, 3000);
    } catch (error) {
      {
        error.response
          ? seterrMsg(error.response.data.msg)
          : seterrMsg(error.response);
      }
    }
  };

  useEffect(() => {
    if (!userPin && !token) {
      router.push("/login");
    }
  }, []);

  console.log(loading);
  return (
    <AuthLayout title="CreatePin | LukiPay">
      <div className="header-wrapper">
        <header className={style.header}>
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
          You Created Yourself.
        </header>{" "}
        <br />
        <div className={style.info}>
          Create 6 digits pin to secure all your money and your data in FazzPay
          app. Keep it secret and don`t tell anyone about your FazzPay account
          password and the PIN.
        </div>
      </div>

      <div className={style.formwrapper}>
        <ReactCodeInput
          className={style.reactPIN}
          id="pinCode"
          type="number"
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
      </div>
      <SubmitBtn
        loadingLocal={loading}
        value={"Confirm"}
        disabled={pin.length < 6}
        onClick={createPin}
      />
    </AuthLayout>
  );
}

export default CreatePin;
