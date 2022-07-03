import { GetUser } from "api";
import DashboardLayout from "components/DashboardLayout";
import HistoryCard from "components/HistoryCard";
import { currencyFormatter } from "helpers/formatter";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/Transfer.module.css";
import { BsPencil } from "react-icons/bs";
import ModalPin from "components/ModalPin";

function TransferToUser() {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [confirm1, setConfirm1] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();
  const receiverId = router.query.id;

  const { token, id } = useSelector((state) => state.auth);
  const { user, isLoading } = GetUser(receiverId, token);
  const { user: myUser } = GetUser(id, token);

  const amountHandler = (value) => {
    setAmount(value);
  };
  //confirm pertamakali
  const handler1 = () => {
    const todayFunc = Date.now();
    const today = new Date(todayFunc);
    // console.log(today.toUTCString());
    setDate(
      today.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeZone: "Asia/Jakarta",
        timeStyle: "long",
      })
    );
    setTimeout(() => {
      setConfirm1(true);
    }, 100);
  };
  // confirm kedua munculin confirm pin
  const handler2 = () => {
    setModal(true);
  };

  const editHandler = () => {
    setConfirm1(false);
  };

  return (
    <>
      {modal && (
        <ModalPin
          setModal={setModal}
          receiverId={receiverId}
          amount={amount}
          notes={notes}
        />
      )}
      <DashboardLayout title="Transfer | Lukipay" active="transfer">
        <div>
          <div className={style.transferMain}>
            <header className={style.header2}>
              <div className={style.title}>Transfer Money</div>
              <HistoryCard user={user && user.data} />
            </header>
            {!confirm1 ? (
              <main className={style.mainSection2}>
                <div className={style.transferInfo}>
                  Type the amount you want to transfer and then press continue
                  to the next steps.
                </div>
                <input
                  className={style.amount}
                  type="number"
                  name="amount"
                  id="amount"
                  min={10000}
                  value={amount && amount}
                  onChange={(e) => {
                    amountHandler(e.target.value);
                  }}
                  placeholder="Minimum amount Rp 10.000"
                />
                <div className={style.myBalance}>
                  {myUser && currencyFormatter.format(myUser.data.balance)}{" "}
                  Available
                </div>
                <div className={style.inputwrapper}>
                  <input
                    type="text"
                    name="notes"
                    id="name"
                    placeholder="Add some notes"
                    onChange={(e) =>
                      setTimeout(() => {
                        setNotes(e.target.value);
                      }, 1200)
                    }
                  />
                  <i className="input-icon">
                    <BsPencil />
                  </i>
                </div>
                <footer className={style.transferFooter}>
                  <input
                    className={style.contBtn}
                    type="submit"
                    value="Continue"
                    disabled={amount.length < 5}
                    onClick={() => handler1()}
                  />
                </footer>
              </main>
            ) : (
              <main className={style.mainSection2}>
                <header className={style.header2}>
                  <div className={style.title}>Details</div>
                </header>
                <div className={style.detailsWrapper}>
                  <div className={style.detailsName}>Amount</div>
                  <div className={style.detailsValue}>
                    {currencyFormatter.format(amount)}
                  </div>
                </div>
                <div className={style.detailsWrapper}>
                  <div className={style.detailsName}>Balance Left</div>
                  <div className={style.detailsValue}>
                    {currencyFormatter.format(myUser.data.balance - amount)}
                  </div>
                </div>
                <div className={style.detailsWrapper}>
                  <div className={style.detailsName}>Date & Time</div>
                  <div className={style.detailsValue}>{date}</div>
                </div>
                <div className={style.detailsWrapper}>
                  <div className={style.detailsName}>Notes</div>
                  <div className={style.detailsValue}>{notes}</div>
                </div>
                <footer className={style.transferFooter}>
                  <input
                    className={style.contBtn}
                    type="submit"
                    value="Edit"
                    onClick={() => editHandler()}
                  />
                  <input
                    className={style.contBtn}
                    type="submit"
                    value="Continue"
                    disabled={amount > myUser.data.balance - amount}
                    onClick={() => handler2()}
                  />
                </footer>
              </main>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default TransferToUser;
