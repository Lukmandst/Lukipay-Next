import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import EmailInput from "components/Input/email";
import NameInput from "components/Input/name";
import PasswordInput from "components/Input/pass";
import Link from "next/link";
import style from "styles/Auth.module.css";

function Signup() {
  return (
    <div>
      <AuthLayout title="SignUp | LukiPay">
        <header className={style.header}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </header>
        <div className={style.info}>
          Transfering money is eassier than ever, you can access FazzPay
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </div>
        <form>
          <NameInput name={"firstname"} placeholder="Enter Your firstname" />
          <NameInput name={"lastname"} placeholder="Enter Your lastname" />
          <EmailInput placeholder="Enter your e-mail" />
          <PasswordInput placeholder="Create your password" />
        </form>
        <SubmitBtn value={"Sign Up"} />
        <p style={{ textAlign: "center" }}>
          Already have an account? Let's
          <span style={{ color: "#6379f4" }}>
            <Link href={"/login"}> Login</Link>
          </span>
        </p>
      </AuthLayout>
    </div>
  );
}

export default Signup;
