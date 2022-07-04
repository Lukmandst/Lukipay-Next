import { GetUser } from "api";
import DashboardLayout from "components/DashboardLayout";
import ReusableModal from "components/ReusableModal";
import { formatPhoneNumber } from "helpers/formatter";
import Image from "next/image";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { MdArrowForward, MdArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import style from "styles/Profile.module.css";
import DefaultPic from "../../../public/android-chrome-512x512.png";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import Loading from "components/Loading";
function Profile() {
  const [modal2, setModal2] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState(false);
  const [errmsg, seterrMsg] = useState(false);
  
  const [loadingImg, setLoadingImg] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const { token, id } = useSelector((state) => state.auth);
  const { user, isLoading, isError } = GetUser(id, token);

  // const handleImage = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setImage({
  //       image: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
      setEdit(true);
    }
  };
  // console.log(image);
  const updateImgHandler = async () => {
    try {
      setMsg(false);
      seterrMsg(false);
      setLoadingImg(true);
      // setIsError(false);

      const body = new FormData();
      body.append("image", image);

      const uploadResult = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/user/image/${id}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      console.log(uploadResult);
      setMsg(uploadResult.data.msg);
      setLoadingImg(false);
      setEdit(false);
    } catch (error) {
      // setIsError(true);
      console.log(error);
      seterrMsg(error.response ? error.response.data.msg : error.response);
      setLoadingImg(false);
      setEdit(false);
    }
  };

  const logOuthandler = async () => {
    try {
      const logOutResut = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/logout`,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(logOutResut.data.msg);
      setTimeout(() => {
        dispatch(resetAuth());
      }, 1500);
      setModal2(false);
      document.querySelector("body").style.overflow = "visible";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {modal2 && (
        <ReusableModal
          header="LogOut"
          bodyInfo="Are you sure want to log out?"
          setModal={setModal2}
          yesHandler={logOuthandler}
        />
      )}
      <DashboardLayout title="Profile | LukiPay" active="profile">
        <div className={style.profileMain}>
          <header className={style.header}>
            <div className={style.profImgWrapper}>
              {image ? (
                <Image
                  src={previewImg}
                  alt="preview"
                  objectFit="cover"
                  layout="fixed"
                  width={80}
                  height={80}
                  className={style.profImg}
                />
              ) : (
                <Image
                  src={
                    user && !user.data.image
                      ? DefaultPic
                      : `${process.env.NEXT_PUBLIC_IMG}${
                          user && user.data.image
                        }`
                  }
                  alt="profile"
                  layout="fixed"
                  width={80}
                  height={80}
                  className={style.profImg}
                />
              )}
            </div>
            <input
              className="d-none"
              type="file"
              id="upload-button"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "none" }}
            />
            {loadingImg ? (
              <Loading />
            ) : !edit ? (
              <label htmlFor="upload-button" className={style.edit}>
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <BsPencil />
                  Edit
                </span>
              </label>
            ) : (
              <div
                htmlFor="upload-button"
                className={style.edit}
                onClick={updateImgHandler}
              >
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <FiUpload />
                  Upload
                </span>
              </div>
            )}
            {msg ? 
            <div style={{ textAlign: "center", color:'#1EC15F' }}>{msg}</div>:
            <div style={{ textAlign: "center", color:'#FF5B37' }}>{errmsg}</div>
             }
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  textTransform: "capitalize",
                }}
              >
                {user && user.data.firstName} {user && user.data.lastName}
              </div>

              {user && user.data.noTelp ? (
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "rgba(58, 61, 66, 0.9)",
                  }}
                >
                  {user && formatPhoneNumber(user.data.noTelp)}
                </div>
              ) : (
                <div>Set phone number!</div>
              )}
            </div>
          </header>
          <section className={style.buttonSection}>
            <div className={style.inputWrapper}>
              <input
                type="button"
                className={style.button}
                value="Personal Information"
              />
              <i>
                <MdArrowForward className={style.icon} />
              </i>
            </div>
            <div className={style.inputWrapper}>
              <input
                type="button"
                className={style.button}
                value="Change Password"
              />
              <i>
                <MdArrowForward className={style.icon} />
              </i>
            </div>
            <div className={style.inputWrapper}>
              <input
                type="button"
                className={style.button}
                value="Change PIN"
              />
              <i>
                <MdArrowForward className={style.icon} />
              </i>
            </div>
            <div className={style.inputWrapper}>
              <input
                type="button"
                className={style.button}
                value="Logout"
                onClick={(e) => {
                  setModal2(true);
                  document.querySelector("body").style.overflow = "hidden";
                }}
              />
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Profile;
