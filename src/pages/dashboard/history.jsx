import { GetFullHistory } from "api";
import DashboardLayout from "components/DashboardLayout";
import HistoryCard from "components/HistoryCard";
import Loading from "components/Loading";
import { useState } from "react";
import { useSelector } from "react-redux";
import style from "styles/History.module.css";

function History() {
  const [filter, setFilter] = useState("WEEK");
  const { token } = useSelector((state) => state.auth);
  const { history, isLoading } = GetFullHistory(filter, token);
  return (
    <>
      <DashboardLayout title="Transaction | LukiPay" active="dashboard">
        <div className={style.historyMain}>
          <header className={style.header}>
            <div className={style.title}>Transaction History</div>
            <div className={style.filter}>
              <span>--Select Filter--</span>
            </div>
          </header>
          <main className={style.mainSection}>
            {isLoading ? (
              <Loading />
            ) : history && (
              history.data.length === 0 ? 
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "25%",
                    fontWeight: "700",
                  }}
                >
                  You have no transaction yet :(
                </div>
              
             : 
              history.data.map((result) => (
                <HistoryCard key={result.id} history={result} />
              ))
            )}
          </main>
        </div>
      </DashboardLayout>
    </>
  );
}

export default History;
