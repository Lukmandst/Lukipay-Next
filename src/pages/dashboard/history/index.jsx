import { GetFullHistory } from "api";
import DashboardLayout from "components/DashboardLayout";
import HistoryCard from "components/HistoryCard";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/History.module.css";

function History() {
  const [filter, setFilter] = useState("WEEK");
  const [limit, setLimit] = useState(7);
  const { token } = useSelector((state) => state.auth);
  const { history, isLoading } = GetFullHistory(filter, token,limit);
  const router = useRouter();
  return (
    <>
      <DashboardLayout title="Transaction | LukiPay" active="dashboard">
        <div className={style.historyMain}>
          <header className={style.header}>
            <div className={style.title}>Transaction History</div>
            <select
              className={style.filter}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={7}>--Select Filter--</option>
              <option value={7}>--Weekly--</option>
              <option value={30}>--Monthly--</option>
              <option value={120}>--Yearly--</option>
            </select>
          </header>
          <main className={style.mainSection}>
            {isLoading ? (
              <Loading />
            ) : (
              history &&
              (history.data.length === 0 ? (
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
                history.data.map((result) => (
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
              ))
            )}
          </main>
        </div>
      </DashboardLayout>
    </>
  );
}

export default History;
