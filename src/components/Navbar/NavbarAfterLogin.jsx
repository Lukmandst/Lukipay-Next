import GetUser from "api";
import Image from "next/image";
import { MdNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import style from "components/styles/Navbar.module.css";
import { formatPhoneNumber } from "helpers/formatter";
import { resetAuth } from "reduxStore/actions/authActions";

function NavbarAfterLogin() {
  const { token, id } = useSelector((state) => state.auth);
  const { user, isLoading, isError } = GetUser(id, token);
  const dispatch = useDispatch();
  if (isError) {
    dispatch(resetAuth());
  }
  return (
    <div className={style.profileMenu}>
      <div className={style.profImg}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG}${user && user.image}`}
          alt="profile"
          layout="fixed"
          width={52}
          height={52}
          className={style.profImg}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "700", fontSize: "18px" }}>
          {user && user.firstName} {user && user.lastName}
        </div>
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: "rgba(58, 61, 66, 0.9)",
          }}
        >
          {user && formatPhoneNumber(user.noTelp)}
        </div>
      </div>
      <MdNotificationsNone className={style.notif} />
    </div>
  );
}

export default NavbarAfterLogin;
