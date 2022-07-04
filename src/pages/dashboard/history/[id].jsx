import { GetFullHistory, GetUser } from "api";
import DashboardLayout from "components/DashboardLayout";
import HistoryCard from "components/HistoryCard";
import { currencyFormatter } from "helpers/formatter";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineCheck, MdOutlinePending, MdPending } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import style from "styles/History.module.css";
import axios from "axios";
import Loading from "components/Loading";
function HistoryDetail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const params = router.query;
  const id = router.query.id;
  const { token } = useSelector((state) => state.auth);

  const date = new Date(params.date);
  //   console.log(router.query);

  const pdfHandler = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const pdfResult = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_HOST_API}/export/transaction/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      // console.log(pdfResult.data.data.url);
      window.open(pdfResult.data.data.url);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <DashboardLayout title="History | LukiPay" active="dashboard">
        <div className={style.detailsMain}>
          <main className={style.mainSection2}>
            <header className={style.header2}>
              <div className={style.statusWrapper}>
                {params.status === "success" ? (
                  <div className={style.successWrapper}>
                    <FaCheck className={style.statusIcon} />
                  </div>
                ) : params.status === "failed" ? (
                  <div className={style.failedWrapper}>
                    <FaTimes className={style.statusIcon} />
                  </div>
                ) : (
                  <div className={style.pendingWrapper}>
                    <MdOutlinePending className={style.pendingIcon} />
                  </div>
                )}
                <div className={style.statusInfo}>
                  <div className="d">{params.type}</div>
                  {params.type != "accept" ? (
                    <div className="d">{params.status}</div>
                  ) : (
                    params.type === "accept" && <div className="d"></div>
                  )}
                </div>
              </div>
            </header>
            <div className={style.detailsWrapper}>
              <div className={style.detailsName}>Amount</div>
              <div className={style.detailsValue}>
                {currencyFormatter.format(params.amount)}
              </div>
            </div>
            <div className={style.detailsWrapper}>
              <div className={style.detailsName}>Date & Time</div>
              <div className={style.detailsValue}>
                {date.toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeZone: "Asia/Jakarta",
                  timeStyle: "long",
                })}
              </div>
            </div>
            <div className={style.detailsWrapper}>
              <div className={style.detailsName}>Notes</div>
              <div className={style.detailsValue}>{params.notes}</div>
            </div>
            <div className={style.title} style={{ textAlign: "center" }}>
              {params.type === "send" ? (
                <div className="">Transfer to {params.fullName} </div>
              ) : params.type === "accept" ? (
                <div className="">Accept from {params.fullName}</div>
              ) : (
                <div className=""></div>
              )}
            </div>
            <HistoryCard history={params} />
          </main>
          <footer className={style.historyFooter}>
            {loading ? (
              <Loading />
            ) : (
              <input
                className={style.pdfBtn}
                type="submit"
                value="Download PDF"
                onClick={() => pdfHandler()}
              />
            )}
            <input
              className={style.homeBtn}
              type="submit"
              value="Back to History"
              //   disabled={amount > myUser.data.balance - amount}
              onClick={() => router.push('/dashboard/history')}
            />
          </footer>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default HistoryDetail;
