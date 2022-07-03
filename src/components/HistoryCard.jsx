import style from "components/styles/HistoryCard.module.css";
import Image from "next/image";
import { currencyFormatter } from "helpers/formatter";

function HistoryCard({ history , phone, user }) {
  return (
    <>
      <div className={style.historyCard}>
        <div className={style.infoWrapperHistory}>
          <div className={style.imgHistory}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG}${user? user.image : history && history.image}`}
              alt="img"
              layout="fixed"
              width={52}
              height={52}
              className={style.imgHistory}
            />
          </div>
          <div className={style.nametypeWrapper}>
            <div className={style.nameHistory}>{user? user.firstName +' '+ user.lastName: history && history.fullName}</div>
            <div className={style.typeHistory}>{user? user.noTelp: history &&history.type }</div>
          </div>
        </div>
        {
        user? <></>: history &&
        history.type === "send" && history.status === "success" ? (
          <div className={style.amountHistoryRed}>
           - {currencyFormatter.format(history.amount)}
          </div>
        ) : history && history.status === "pending" ? (
          <div className={style.amountHistoryGray}>
            {currencyFormatter.format(history.amount)}
          </div>
        ) : history && history.type === "topup" && history.status === "success" ? (
          <div className={style.amountHistoryGreen}>
            + {currencyFormatter.format(history.amount)}
          </div>
        ) : history && (
          <div className={style.amountHistoryGray}>
            {currencyFormatter.format(history.amount)}
          </div>
        )}
      </div>
    </>
  );
}

export default HistoryCard;
