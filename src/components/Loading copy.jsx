import style from "./styles/Loading.module.css";
function WhiteLoading() {
  return (
    <div className={style.loadingWrapper} >
      <div className={style.ldsFacebook} >
        <div style={{ background: "#fff" }}></div>
        <div style={{ background: "#fff" }}></div>
        <div style={{ background: "#fff" }}></div>
      </div>
    </div>
  );
}

export default WhiteLoading;
