import DashboardLayout from "components/DashboardLayout";
import Loading from "components/Loading";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function Changepin() {
  const [phone, setPhone] = useState("");

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  const { token, id } = useSelector((state) => state.auth);

  const router = useRouter();

  const updatePhone = async () => {
    const body = {
      noTelp: phone,
    };

    console.log(body);
    // console.log(amount.length);
    setMsg(false);
    seterrMsg(false);
    setLoadingUpdate(false);
    try {
      if (phone.length < 11) {
        seterrMsg("Phone number should be more than 11 ");
      } else {
        setLoadingUpdate(true);
        const pinResult = await axios({
          method: "PATCH",
          url: `${process.env.NEXT_PUBLIC_HOST_API}/user/profile/${id}`,
          data: body,
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(pinResult.data);
        setLoadingUpdate(false);
        seterrMsg(false);
        setMsg(pinResult.data.msg);
        setConfirm(true);
        setTimeout(() => {
          setMsg('');
          setPhone("");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }, 2000)
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
        setPhone("");
      }, 2000);
    }
  };
  //   console.log(pin2)

  return (
    <div>
      <DashboardLayout title="Change Pass | LukiPay">
        <div className={style.infoMain}>
          <main className={style.mainInfoSection}>
            <header className={style.infoHeader}>
              <div className={style.title}>Edit Phone Number</div>
              <div className={style.subtitle}>
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </div>
            </header>

            <div
              className={style.mainSection2}
              style={{ width: "50%", margin: "auto" }}
            >
              <input
                type="number"
                name="number"
                id="number"
                value={phone ? phone : phone.length < 1 && ""}
                onChange={(e) => {
                    e.preventDefault()
                  
                    setPhone(e.target.value);
                  
                }}
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
                    disabled={!phone}
                    onClick={() => updatePhone()}
                  />
                )}
              </footer>
            </div>
          </main>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Changepin;
