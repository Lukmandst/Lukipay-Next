import axios from "axios";
import DashboardLayout from "components/DashboardLayout";
import PasswordInput from "components/Input/pass";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";

function Changepass() {
  const [old, setOld] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  const { token, id } = useSelector((state) => state.auth);

  const router = useRouter();
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
        setOld("");
        setNewPass("");
        setConfirm("");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }, 2000);
    } catch (error) {
      console.log(error);
      seterrMsg(error.response ? error.response.data.msg : error.response);
      setLoadingUpdate(false);
      setTimeout(() => {
        seterrMsg(false);
        setOld("");
        setNewPass("");
        setConfirm("");
      }, 2000);
    }
  };

  return (
    <div>
      <DashboardLayout title="Change Pass | LukiPay">
        <div className={style.infoMain}>
          <main className={style.mainInfoSection}>
            <header className={style.infoHeader}>
              <div className={style.title}>Change Password</div>
              <div className={style.subtitle}>
                You must enter your current password and then type your new
                password twice.
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
                defaultValue={old}
                id="old"
                placeholder="Current Password"
                setPass={setOld}
              />
              <PasswordInput
                defaultValue={newPass}
                id="new"
                placeholder="New Password"
                setPass={setNewPass}
              />
              <PasswordInput
                defaultValue={confirm}
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
