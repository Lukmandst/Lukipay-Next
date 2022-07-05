import DashboardLayout from "components/DashboardLayout";
import style from "styles/Dashboard.module.css";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { GetUser, GetDashboard, GetSmallHistory } from "api";
import { useSelector } from "react-redux";
import { currencyFormatter, formatPhoneNumber } from "helpers/formatter";
import Link from "next/link";
import Modaltopup from "components/Modal";
import { useEffect, useState } from "react";
import Image from "next/image";
import HistoryCard from "components/HistoryCard";
import Loading from "components/Loading";
import WhiteLoading from "components/Loading copy";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value && value.split(" ")[1]}
      </text>
    </g>
  );
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 8,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 18,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  const [modal, setModal] = useState(false);
  const [income, setIncome] = useState(false);
  const [expense, setExpense] = useState(false);
  const { id, token } = useSelector((state) => state.auth);
  const { user, isLoading } = GetUser(id, token);
  const { dashboard, isLoading: loadingDashboard } = GetDashboard(id, token);
  const { smallHistory } = GetSmallHistory(token);
  const router = useRouter();
  // console.log(smallHistory);
  console.log(dashboard);

  useEffect(() => {
    if (dashboard) {
      setIncome(dashboard.data.listIncome);
    }
    if (dashboard) {
      setExpense(dashboard.data.listExpense);
    }
    console.log(dashboard && dashboard.data.listExpense, "expense");
    console.log(dashboard && dashboard.data.listIncome, "income");
  }, [dashboard]);
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
            <div className={style.graph}>
              <BarChart
                width={500}
                height={300}
                data={income}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#6379F4">
                  <LabelList dataKey="name" content={renderCustomizedLabel} />
                </Bar>
                {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
              </BarChart>
            </div>
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
              ) : smallHistory && smallHistory.data.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "25%",
                    fontWeight: "700",
                  }}
                >
                  You have no transaction yet :(
                </div>
              ) : (
                smallHistory &&
                smallHistory.data.map((result) => (
                  <div
                    key={result.id}
                    className="wrapperrr"
                    onClick={() =>
                      router.push({
                        pathname: `/dashboard/history/${result.id}`,
                        query: {
                          fullName: result.fullName,
                          date: result.createdAt,
                          type: result.type,
                          amount: result.amount,
                          status: result.status,
                          notes: result.notes,
                          image: result.image,
                        },
                      })
                    }
                  >
                    <HistoryCard key={result.id} history={result} />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

// export default Dashboard;
export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
