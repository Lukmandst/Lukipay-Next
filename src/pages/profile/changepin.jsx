import DashboardLayout from "components/DashboardLayout";
import Loading from "components/Loading";
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";
import stylePin from "styles/Auth.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function Changepin() {
  const [pin, setPinCode] = useState("");
  const [pin2, setPinCode2] = useState("");
  const [confirm, setConfirm] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  const { token, id } = useSelector((state) => state.auth);
  console.log(pin.length);
  const router = useRouter();

  const handlePinChange = (pin) => {
    setPinCode(pin);
  };
  const handlePinChange2 = (pin2) => {
    setPinCode2(pin2);
  };

  const checkPinHandler = async () => {
    // console.log(amount.length);
    setMsg(false);
    seterrMsg(false);
    setLoadingUpdate(false);
    try {
      if (pin.length < 6) {
        seterrMsg("Please input your pin!");
      } else {
        setLoadingUpdate(true);
        const pinResult = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/user/pin?pin=${pin}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(pinResult.data);
        setLoadingUpdate(false);
        seterrMsg(false);
        setMsg(pinResult.data.msg);
        setConfirm(true);
        setPinCode("");
        setTimeout(() => {
          setMsg(false);
          setPinCode("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      const err = (await error.response)
        ? error.response.data.msg
        : error.message;
      seterrMsg(err);
      setLoadingUpdate(false);
      setPinCode("");
      setTimeout(() => {
        seterrMsg(false);
        setPinCode("");
      }, 2000);
    }
  };
  const updatePinhandler = async () => {
    const body = {
      pin: pin2,
    };

    console.log(body);
    // console.log(amount.length);
    setMsg(false);
    seterrMsg(false);
    setLoadingUpdate(false);
    try {
      if (pin2.length < 6) {
        seterrMsg("Please input your pin!");
      } else {
        setLoadingUpdate(true);
        const pinResult = await axios({
          method: "PATCH",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/user/pin/${id}`,
          data: body,
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(pinResult.data);
        setLoadingUpdate(false);
        seterrMsg(false);
        setMsg(pinResult.data.msg);
        setConfirm(true);
        setTimeout(() => {
          setMsg(false);
          setPinCode("");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      const err = (await error.response)
        ? error.response.data.msg
        : error.message;
      seterrMsg(err);
      setLoadingUpdate(false);
      setTimeout(() => {
        seterrMsg(false);
        setPinCode("");
      }, 2000);
    }
  };
  //   console.log(pin2)

  return (
    <div>
      <DashboardLayout title="Change Pass | LukiPay">
        <div className={style.infoMain}>
          {!confirm ? (
            <main className={style.mainInfoSection}>
              <header className={style.infoHeader}>
                <div className={style.title}>Change PIN</div>
                <div className={style.subtitle}>
                  Enter your current 6 digits Zwallet PIN below to continue to
                  the next steps.
                </div>
              </header>

              <div
                className={style.mainSection2}
                style={{ width: "50%", margin: "auto" }}
              >
                <ReactCodeInput
                  className={stylePin.reactPIN}
                  id="pinCode"
                  type="number"
                  fields={6}
                  onChange={handlePinChange}
                  value={pin.length === 0 ? "" : pin && pin}
                />
                {msg ? (
                  <div style={{ textAlign: "center", color: "#1EC15F" }}>
                    {msg}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", color: "#FF5B37" }}>
                    {errmsg}
                  </div>
                )}
                <footer className={style.transferFooter}>
                  {loadingUpdate ? (
                    <Loading />
                  ) : (
                    <input
                      className={style.contBtn}
                      type="submit"
                      value="Confirm"
                      disabled={pin.length < 6}
                      onClick={() => checkPinHandler()}
                    />
                  )}
                </footer>
              </div>
            </main>
          ) : (
            <main className={style.mainInfoSection}>
              <header className={style.infoHeader}>
                <div className={style.title}>Change PIN</div>
                <div className={style.subtitle}>
                  Type your new 6 digits security PIN to use in Zwallet.
                </div>
              </header>
              {msg ? (
                <div style={{ textAlign: "center", color: "#1EC15F" }}>
                  {msg}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#FF5B37" }}>
                  {errmsg}
                </div>
              )}
              <div
                className={style.mainSection2}
                style={{ width: "50%", margin: "auto" }}
              >
                <ReactCodeInput
                  className={stylePin.reactPIN}
                  id="pinCode"
                  type="number"
                  fields={6}
                  onChange={handlePinChange2}
                  value={pin2}
                />
                <footer className={style.transferFooter}>
                  {loadingUpdate ? (
                    <Loading />
                  ) : (
                    <input
                      className={style.contBtn}
                      type="submit"
                      value="Change PIN"
                      disabled={pin2.length < 6}
                      onClick={() => updatePinhandler()}
                    />
                  )}
                </footer>
              </div>
            </main>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Changepin;
