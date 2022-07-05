import { GetUser } from "api";
import DashboardLayout from "components/DashboardLayout";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";
import { formatPhoneNumber } from "helpers/formatter";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import Loading from "components/Loading";
import { useRouter } from "next/router";

function Info() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [edit, setEdit] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  const { token, id } = useSelector((state) => state.auth);
  const { user, isLoading } = GetUser(id, token);
  const router = useRouter();

  const firstNameHandler = (value) => {
    setFirstname(value);
  };

  const updateUser = async () => {
    setLoadingUpdate(false);
    setMsg(false);
    seterrMsg(false);
    const body = {
      firstName: firstName,
      lastName: lastName,
    };
    try {
      setLoadingUpdate(true);
      const updateResult = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/user/profile/${id}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingUpdate(false);
      setMsg(updateResult.data.msg);
      setTimeout(() => {
        setMsg(false);
      }, 2000);
      setEdit(false);
    } catch (error) {
      console.log(error);
      seterrMsg(error.response ? error.response.data.msg : error.response);
      setLoadingUpdate(false);
      setEdit(false);
      setTimeout(() => {
        seterrMsg(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstname(user.data.firstName);
      setLastname(user.data.lastName);
    }
  }, []);

  return (
    <>
      <DashboardLayout title="Profile | LukiPay">
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
            {loadingUpdate ? (
              <Loading />
            ) : edit ? (
              <div className={style.editBtn}>
                <div className={style.save} onClick={() => updateUser()}>
                  Save
                </div>
              </div>
            ) : (
              <div className={style.editBtn}>
                <div className={style.save} onClick={() => setEdit(!edit)}>
                  Edit
                </div>
              </div>
            )}

            <div className={style.mainSection2}>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {!edit ? (
                    <>
                      <div className={style.detailsWrapper}>
                        <div className={style.detailsName}>First Name</div>
                        <div className={style.detailsValue}>
                          {user && user.data.firstName}
                        </div>
                      </div>
                      <div className={style.detailsWrapper}>
                        <div className={style.detailsName}>Last Name</div>
                        <div className={style.detailsValue}>
                          {user && user.data.lastName}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={style.inputwrapper}>
                        <div className={style.detailsName}>First Name</div>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          defaultValue={user && user.data.firstName}
                          placeholder="Insert your first name"
                          onChange={(e) => {
                            firstNameHandler(e.target.value);
                          }}
                        />

                        <BsPencil className={style.pencil} />
                      </div>
                      <div className={style.inputwrapper}>
                        <div className={style.detailsName}>First Name</div>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          defaultValue={user && user.data.lastName}
                          placeholder="Insert your last name"
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                        />

                        <BsPencil className={style.pencil} />
                      </div>
                    </>
                  )}

                  <div className={style.detailsWrapper}>
                    <div className={style.detailsName}>Verified Email</div>
                    <div
                      className={style.detailsValue}
                      style={{ color: "#7A7886" }}
                    >
                      {user && user.data.email}
                    </div>
                  </div>
                  <div
                    className={style.detailsWrapper}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="">
                      <div className={style.detailsName}>Phone Number</div>
                      {user && user.data.noTelp ? (
                        <div className={style.detailsValue}>
                          {user && formatPhoneNumber(user.data.noTelp)}
                        </div>
                      ) : (
                        <div>Set phone number!</div>
                      )}
                    </div>
                    <div
                      className={style.manage}
                      onClick={() => router.push("/profile/changephone")}
                    >
                      Manage
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Info;
