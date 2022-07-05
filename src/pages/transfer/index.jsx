import { GetUserinDB } from "api";
import DashboardLayout from "components/DashboardLayout";
import HistoryCard from "components/HistoryCard";
import Loading from "components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";
import style from "styles/Transfer.module.css";

function Page({ page }) {
  const [search, setSearch] = useState("a");
  const [filter, setFilter] = useState("firstName");
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("ASC");
  // const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const { contactUser, isLoading, isError } = GetUserinDB(
    page,
    limit,
    search,
    filter,
    sort,
    token
  );

  // ... handle loading and error states

  return (
    <>
      {contactUser ? (
        contactUser.data.map((item) => (
          <div key={item.id}>{item.firstName}</div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

function Transfer() {
  const [search, setSearch] = useState("a");
  const [filter, setFilter] = useState("firstName");
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log(router.query);
  const { contactUser, isLoading, isError } = GetUserinDB(
    page,
    limit,
    search,
    filter,
    sort,
    token
  );

  console.log(contactUser);
  // console.log(token)
  console.log(isError);
  useEffect(() => {
    router.push(
      `/transfer/?page=${page}&name=${search}`,
      `/transfer/?page=${page}&name=${search}`,
      { shallow: true }
    );
  }, [page, search]);

  return (
    <DashboardLayout title="Transfer | LukiPay" active="transfer">
      <div className={style.transferMain}>
        <header className={style.header}>
          <div className={style.title}>Search Receiver</div>
          <div className={style.searchwrapper}>
            <HiOutlineSearch className={style.search} />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search receiver here"
              onChange={(e) => {
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 1500);
              }}
            />
          </div>
        </header>
        <main className={style.mainSection}>
          {isLoading ? (
            <Loading />
          ) : contactUser ? (
            contactUser.data.map((result) => (
              <div
                key={result.id}
                className="wrapperrr"
                onClick={() => router.push(`/transfer/${result.id}`)}
              >
                <HistoryCard key={result.id} history={result} user={result} />
              </div>
            ))
          ) : (
            <></>
          )}
        </main>
        <div className={style.pagination}>
          <div style={{ display: "none" }}>
            <Page index={page + 1} />
          </div>
          {contactUser && page === 1 ? (
            <button onClick={() => setPage(page + 1)}>next</button>
          ) : contactUser && page < contactUser.pagination.totalPage ? (
            <div className={style.pagination2}>
              <button
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              >
                previous
              </button>
              <div className="">
                {page}/{contactUser && contactUser.pagination.totalPage}
              </div>
              <button onClick={() => setPage(page + 1)}>next</button>
            </div>
          ) : contactUser &&
            (page - 1) * limit < contactUser.pagination.totalPage ? (
            <>
              <button
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              >
                previous
              </button>
              <div className="">
                {page}/{contactUser && contactUser.pagination.totalPage}
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              previous
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Transfer;
