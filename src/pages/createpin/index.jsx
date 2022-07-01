import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import React from "react";
import style from "styles/Auth.module.css";

function CreatePin() {
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
        <SubmitBtn value={"Confirm"} />
      </div>
    </AuthLayout>
  );
}

export default CreatePin;
