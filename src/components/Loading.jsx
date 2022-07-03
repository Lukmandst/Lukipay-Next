import style from "./styles/Loading.module.css";
function Loading() {
  return (
    <div className={style.loadingWrapper}>
      <div className={style.ldsFacebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
