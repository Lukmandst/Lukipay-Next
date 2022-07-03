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
import Loading from "components/Loading";
import WhiteLoading from "components/Loading copy";

function Dashboard() {
  const [modal, setModal] = useState(false);
  const { id, token } = useSelector((state) => state.auth);
  const { user, isLoading } = GetUser(id, token);
  const { dashboard, isLoading: loadingDashboard } = GetDashboard(id, token);
  const { smallHistory } = GetSmallHistory(token);

  console.log(smallHistory);
  // if (isLoading) return <Loading />;
  return (
    <>
      {modal && <Modaltopup setModal={setModal} />}
      <DashboardLayout active="dashboard">
        <div className={style.dashboardMain}>
          <section className={style.mainSection}>
            <div className={style.mainA}>
              <div style={{ fontSize: "18px" }}>Balance</div>
              <div style={{ fontSize: "40px" }}>
                {isLoading ? (
                  <WhiteLoading />
                ) : (
                  user && currencyFormatter.format(user.data.balance)
                )}
              </div>
              {user && user.data.noTelp ? (
                <div>{user && formatPhoneNumber(user.data.noTelp)}</div>
              ) : (
                <div>Set phone number!</div>
              )}
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
                <div className={style.type}>Income</div>
                {loadingDashboard ? (
                  <Loading />
                ) : (
                  dashboard && (
                    <p style={{ fontWeight: 700 }}>
                      {currencyFormatter.format(dashboard.data.totalIncome)}
                    </p>
                  )
                )}
              </div>
              <div className={style.expense}>
                <MdOutlineArrowUpward className={style.icon} />
                <div className={style.type}>Expense</div>
                {loadingDashboard ? (
                  <Loading />
                ) : (
                  dashboard && (
                    <p style={{ fontWeight: 700 }}>
                      {currencyFormatter.format(dashboard.data.totalExpense)}
                    </p>
                  )
                )}
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

            <div className={style.historyInfo}>
              {loadingDashboard ? (
                <Loading />
              ) : smallHistory ? (
                smallHistory.data.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "25%",
                      fontWeight: "700",
                    }}
                  >
                    You have no transaction yet :(
                  </div>
                )
              ) : (
                smallHistory.data.map((result) => (
                  <HistoryCard key={result.id} history={result} />
                ))
              )}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
