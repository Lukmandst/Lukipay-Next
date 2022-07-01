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
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccesMsg] = useState(false);
  const regisHandler = async () => {
    const body = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: pass,
    };
    let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    let passFormat = /(?=.*[0-9])/;
    // console.log(body.firstName.length);
    try {
      if (
        body.firstName.length < 1 &&
        body.lastName.length < 1 &&
        body.email.length < 1 &&
        body.password.length < 1
      ) {
        setErrorMsg("Data cannot be empty !");
      } else if (body.firstName.length < 3) {
        setErrorMsg("Firstname should be 3 characters or more !");
      } else if (body.lastName.length < 3) {
        setErrorMsg("Lastname should be 3 characters or more !");
      } else if (!body.email.match(emailFormat)) {
        setErrorMsg("Email format should be mail@mail.com !");
      } else if (body.password.length < 3 || !body.password.match(passFormat)) {
        setErrorMsg(
          "Password should be at least 3 characters and includes at least 1 numeric character !"
        );
      } else {
        setErrorMsg(false);
        const registResult = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/register`,
          data: body,
        });
        setSuccesMsg(registResult.data.msg);
      }
    } catch (error) {
      {
        error.response
          ? setErrorMsg(error.response.data.msg)
          : setErrorMsg(error.response);
      }
      // console.log(error);
    }
  };

  return (
    <div>
      <AuthLayout title="SignUp | LukiPay">
        <div className="header-wrapper">
          <header className={style.header}>
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </header>{" "}
          <br />
          <div className={style.info}>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </div>
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
          {errorMsg ? (
            <div className="alert-danger">{errorMsg}</div>
          ) : successMsg ? (
            <div className="alert-success">{successMsg}</div>
          ) : (
            <></>
          )}
          <SubmitBtn value={"Sign Up"} onClick={regisHandler} disabled={!firstname || !lastname || !email || !pass} />
          <p style={{ textAlign: "center" }}>
            Already have an account? Let`s
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
