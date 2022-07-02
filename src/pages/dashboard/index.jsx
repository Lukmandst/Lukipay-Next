import DashboardLayout from "components/DashboardLayout";
import style from "styles/Dashboard.module.css";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import GetUser from "api";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormatter, formatPhoneNumber } from "helpers/formatter";
import Link from "next/link";
import Modaltopup from "components/Modal";
import { useState } from "react";

function Dashboard() {
  const [modal, setModal] = useState(false);
  const { id, token } = useSelector((state) => state.auth);
  const { user } = GetUser(id, token);
  
  return (
    <>
      {modal && <Modaltopup setModal={setModal} />}
      <DashboardLayout>
        <div className={style.dashboardMain}>
          <section className={style.mainSection}>
            <div className={style.mainA}>
              <p style={{ fontSize: "18px" }}>Balance</p>
              <h2 style={{ fontSize: "40px" }}>
                {user && currencyFormatter.format(user.balance)}
              </h2>
              <p>{user && formatPhoneNumber(user.noTelp)}</p>
            </div>
            <div className={style.mainB}>
              <Link href={"/transfer"}>
                <div className={style.transferBtn}>
                  <MdOutlineArrowUpward className={style.icon} />
                  <h3>Transfer</h3>
                </div>
              </Link>
              <div className={style.topUpBtn} onClick={() => setModal(true)}>
                <HiOutlinePlus className={style.icon} />
                <h3>Top Up</h3>
              </div>
            </div>
          </section>
          <section className={style.section1}>
            <div className={style.section1Menu}>
              <div className={style.income}>
                <MdOutlineArrowDownward className={style.icon} />
                <p>Income</p>
                <p>Rp22222</p>
              </div>
              <div className={style.expense}>
                <MdOutlineArrowUpward className={style.icon} />
                <p>Expense</p>
                <p>Rp11111111</p>
              </div>
            </div>
            <div className={style.graph}>graph</div>
          </section>
          <section className={style.section2}>
            <div className={style.historyHead}>
              <p className={style.historyTitle}>Transaction History</p>
              <p className={style.seeAll}>See all</p>
            </div>
            <div className={style.historyCard}>
              <div className="image">gambar</div>
              <div className="infoWrapper">
                <div className="Name">Samuel</div>
                <div className="info">Transfer</div>
              </div>
              <div className="amount">Rp50000</div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
