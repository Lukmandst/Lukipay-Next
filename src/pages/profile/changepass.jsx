import axios from "axios";
import DashboardLayout from "components/DashboardLayout";
import PasswordInput from "components/Input/pass";
import Loading from "components/Loading";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";

function Changepass() {
  const [old, setOld] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  const { token, id } = useSelector((state) => state.auth);

  const updatePassword = async () => {
    setLoadingUpdate(false);
    setMsg(false);
    seterrMsg(false);
    const body = {
      oldPassword: old,
      newPassword: newPass,
      confirmPassword: confirm,
    };
    try {
      setLoadingUpdate(true);
      const updateResult = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/user/password/${id}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingUpdate(false);
      setMsg(updateResult.data.msg);
      setTimeout(() => {
        setMsg(false);
        setOld('')
        setNewPass('')
        setConfirm('')
      }, 2000);
    } catch (error) {
      console.log(error);
      seterrMsg(error.response ? error.response.data.msg : error.response);
      setLoadingUpdate(false);
      setTimeout(() => {
        seterrMsg(false);
        setOld('')
        setNewPass('')
        setConfirm('')
      }, 2000);
    }
  };

  return (
    <div>
      <DashboardLayout title="Change Pass | LukiPay">
        <div className={style.infoMain}>
          <main className={style.mainInfoSection}>
            <header className={style.infoHeader}>
              <div className={style.title}>Personal Information</div>
              <div className={style.subtitle}>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </div>
            </header>
            {msg ? (
              <div style={{ textAlign: "center", color: "#1EC15F" }}>{msg}</div>
            ) : (
              <div style={{ textAlign: "center", color: "#FF5B37" }}>
                {errmsg}
              </div>
            )}
            <div
              className={style.mainSection2}
              style={{ width: "50%", margin: "auto" }}
            >
              <PasswordInput
                id="old"
                placeholder="Current Password"
                setPass={setOld}
              />
              <PasswordInput
                id="new"
                placeholder="New Password"
                setPass={setNewPass}
              />
              <PasswordInput
                id="confirm"
                placeholder="Repeat new Password"
                setPass={setConfirm}
              />
              <footer className={style.transferFooter}>
                {loadingUpdate ? (
                  <Loading />
                ) : (
                  <input
                    className={style.contBtn}
                    type="submit"
                    value="Continue"
                    disabled={!old || !newPass || !confirm}
                    onClick={() => updatePassword()}
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

export default Changepass;
