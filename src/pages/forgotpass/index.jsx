import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import EmailInput from "components/Input/email";
import { useState } from "react";
import style from "styles/Auth.module.css";
import axios from "axios";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const forgotHandler = async () => {
    const body = {
      email: email,
      linkDirect: `${process.env.NEXT_PUBLIC_WEB_URL}/reset-pass`,
    };
    // console.log(body);
    setMsg(false);
    setErrMsg(false);
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/forgot-password`,
        data: body,
      });
      // console.log(result);
      setMsg(result.data.msg);
    } catch (error) {
      console.error(error);
      {
        error.response
          ? setErrMsg(error.response.data.msg)
          : setErrMsg(error.response);
      }
    }
  };
  return (
    <AuthLayout title="Forgot Pass | LukiPay">
      <div className="header-wrapper">
        <header className={style.header}>
          Did You Forgot Your Password? Don`t Worry, You Can Reset Your Password
          In a Minutes.
        </header>{" "}
        <br />
        <div className={style.info}>
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </div>
      </div>
      <div className={style.formwrapper}>
        <EmailInput setEmail={setEmail} />
        {errMsg ? (
          <div className="alert-danger">{errorMsg}</div>
        ) : msg ? (
          <div className="alert-success">{msg}</div>
        ) : (
          <></>
        )}
        <SubmitBtn
          value={"Confirm"}
          onClick={forgotHandler}
          disabled={!email}
        />
      </div>
    </AuthLayout>
  );
}

export default ForgotPass;
