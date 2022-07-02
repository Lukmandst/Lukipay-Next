import DashboardLayout from "components/DashboardLayout";
import style from "styles/Dashboard.module.css";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { GetUser, GetDashboard, GetSmallHistory } from "api";
import { useSelector } from "react-redux";
import { currencyFormatter, formatPhoneNumber } from "helpers/formatter";
import Link from "next/link";
import Modaltopup from "components/Modal";
import { useState } from "react";
import Image from "next/image";
import HistoryCard from "components/HistoryCard";

function Dashboard() {
  const [modal, setModal] = useState(false);
  const { id, token } = useSelector((state) => state.auth);
  const { user } = GetUser(id, token);
  const { dashboard } = GetDashboard(id, token);
  const { smallHistory } = GetSmallHistory(token);
  return (
    <>
      {modal && <Modaltopup setModal={setModal} />}
      <DashboardLayout>
        <div className={style.dashboardMain}>
          <section className={style.mainSection}>
            <div className={style.mainA}>
              <div style={{ fontSize: "18px" }}>Balance</div>
              <div style={{ fontSize: "40px" }}>
                {user && currencyFormatter.format(user.balance)}
              </div>
              <div>{user && formatPhoneNumber(user.noTelp)}</div>
            </div>
            <div className={style.mainB}>
              <Link href={"/transfer"}>
                <div className={style.transferBtn}>
                  <MdOutlineArrowUpward className={style.icon} />
                  <h3>Transfer</h3>
                </div>
              </Link>
              <div
                className={style.topUpBtn}
                onClick={() => {
                  setModal(true);
                  document.querySelector("body").style.overflow = "hidden";
                }}
              >
                <HiOutlinePlus className={style.icon} />
                <h3>Top Up</h3>
              </div>
            </div>
          </section>
          <section className={style.section1}>
            <div className={style.section1Menu}>
              <div className={style.income}>
                <MdOutlineArrowDownward className={style.icon} />
                <p className={style.type}>Income</p>
                <p style={{ fontWeight: 700 }}>
                  {dashboard&& currencyFormatter.format(dashboard.totalIncome)}
                </p>
              </div>
              <div className={style.expense}>
                <MdOutlineArrowUpward className={style.icon} />
                <p className={style.type}>Expense</p>
                <p style={{ fontWeight: 700 }}>
                  { dashboard && currencyFormatter.format(dashboard.totalExpense)}
                </p>
              </div>
            </div>
            <div className={style.graph}>graph</div>
          </section>
          <section className={style.section2}>
            <div className={style.historyHead}>
              <div className={style.historyTitle}>Transaction History</div>
              <Link href="/dashboard/history">
                <div className={style.seeAll}>See all</div>
              </Link>
            </div>
            {Array.isArray(smallHistory) ? (
              smallHistory.map((result) => (
                <HistoryCard key={result.id} history={result} />
              ))
            ) : (
              <></>
            )}
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
