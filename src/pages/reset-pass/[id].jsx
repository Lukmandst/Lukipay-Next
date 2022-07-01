import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import PasswordInput from "components/Input/pass";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "styles/Auth.module.css";
import axios from "axios";

function ResetPass() {
  const [newPass, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errmsg, seterrmsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const params = router.query.id;
  // console.log(params);

  const resetHandler = async () => {
    const body = {
      keysChangePassword: params,
      newPassword: newPass,
      confirmPassword: confirm,
    };
    setSuccess(false);
    seterrmsg(false);
    try {
      const result = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/reset-password`,
        data: body,
      });
      console.log(result);
      setSuccess(result.data.msg);
      seterrmsg(false);
    } catch (error) {
      console.error(error);
      {
        error.response
          ? seterrmsg(error.response.data.msg)
          : seterrmsg(error.response);
      }
    }
  };
  return (
    <AuthLayout title="New Pass | LukiPay">
      <div className="header-wrapper">
        <header className={style.header}>
          Did You Forgot Your Password? Don`t Worry, You Can Reset Your Password
          In a Minutes.
        </header><br/>
        <div className={style.info}>
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </div>
      </div>
      <div className={style.formwrapper}>
        <PasswordInput
          placeholder="Create new password"
          id="new"
          setPass={setNew}
        />
        <PasswordInput
          placeholder="Confirm new password"
          id="confirm"
          setPass={setConfirm}
        />
        {errmsg ? (
          <div className="alert-danger">{errmsg}</div>
        ) : success ? (
          <div className="alert-success">{success}</div>
        ) : (
          <></>
        )}
        <SubmitBtn
          value={"Confirm"}
          onClick={resetHandler}
          disabled={!newPass || !confirm}
        />
      </div>
    </AuthLayout>
  );
}

export default ResetPass;
