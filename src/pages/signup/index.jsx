import axios from "axios";
import AuthLayout from "components/AuthLayout";
import SubmitBtn from "components/Buttons/submit";
import EmailInput from "components/Input/email";
import NameInput from "components/Input/name";
import PasswordInput from "components/Input/pass";
import Link from "next/link";
import { useState } from "react";
import style from "styles/Auth.module.css";

function Signup() {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const regisHandler = async () => {
    const body = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: pass,
    };
    console.log(body);
    try {
      const registResult = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/register`,
        data: body,
      });
      console.log(registResult);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className={style.formwrapper}>
          <form>
            <NameInput
              name={"firstname"}
              placeholder="Enter Your firstname"
              setName={setFirst}
            />
            <NameInput
              name={"lastname"}
              placeholder="Enter Your lastname"
              setName={setLast}
            />
            <EmailInput placeholder="Enter your e-mail" setEmail={setEmail} />
            <PasswordInput
              placeholder="Create your password"
              setPass={setPass}
            />
          </form>
          <SubmitBtn value={"Sign Up"} onClick={regisHandler} />
          <p style={{ textAlign: "center" }}>
            Already have an account? Let's
            <span style={{ color: "#6379f4" }}>
              <Link href={"/login"}> Login</Link>
            </span>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Signup;
