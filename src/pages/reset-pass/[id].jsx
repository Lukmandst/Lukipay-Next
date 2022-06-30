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
  const [msg, setmsg] = useState("");
  const router = useRouter();
  const params = router.query.id;
  // console.log(params);

  const resetHandler = async () => {
    const body = {
      keysChangePassword: params,
      newPassword: newPass,
      confirmPassword: confirm,
    };
    try {
      const result = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/reset-password`,
        data: body,
      });
      console.log(result);
      setmsg(result.data.msg)
    } catch (error) {
      console.error(error);
      {error.response? setmsg(error.response.data.msg): setmsg(error.response)}
    }
  };
  return (
    <AuthLayout title="New Pass | LukiPay">
      <header className={style.header}>
        Did You Forgot Your Password? Don't Worry, You Can Reset Your Password
        In a Minutes.
      </header>
      <div className={style.info}>
        To reset your password, you must type your e-mail and we will send a
        link to your email and you will be directed to the reset password
        screens.
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
        {msg?msg:<></>}
        <SubmitBtn value={"Confirm"} onClick={resetHandler} />
      </div>
    </AuthLayout>
  );
}

export default ResetPass;
