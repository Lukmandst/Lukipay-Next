import DashboardLayout from "components/DashboardLayout";
import style from "styles/Dashboard.module.css";
import {
  MdOutlineDashboard,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineLogout,
} from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import GetUser from "api";
import { useSelector } from "react-redux";

function Dashboard() {
  const { id, token } = useSelector((state) => state.auth);
  const { user } = GetUser(id, token);
  return (
    <DashboardLayout>
      <div className={style.dashboardMain}>
        <section className={style.mainSection}>
          <div className={style.mainA}>
            <p>Balance</p>
            <h2>{user && user.balance}</h2>
            <p>{user && user.noTelp}</p>
          </div>
          <div className={style.mainB}>
            <div className={style.transferBtn}>Transfer</div>
            <div className={style.topUpBtn}>Top Up</div>
          </div>
        </section>
        <section className={style.section1}>
          <div className={style.section1Menu}>
            <div className={style.income}>
              <p>Income</p>
              <p>Rp22222</p>
            </div>
            <div className={style.expense}>
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
  );
}

export default Dashboard;
