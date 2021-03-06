import useSWR from "swr";
import axios from "axios";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export function GetUser(id, token) {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_HOST_API}/user/profile/${id}`, token],
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function GetDashboard(id, token) {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_HOST_API}/dashboard/${id}`, token],
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    dashboard: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function GetSmallHistory(token) {
  const { data, error } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_HOST_API}/transaction/history?page=1&limit=5&filter=WEEK`,
      token,
    ],
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    smallHistory: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function GetFullHistory(filter = "WEEK", token,limit) {
  const { data, error } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_HOST_API}/transaction/history?page=1&limit=${limit}&filter=${filter}`,
      token,
    ],
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    history: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function GetUserinDB(
  page = "1",
  limit = "20",
  search = 'a',
  filter = "firstName",
  sort = "ASC",
  token
) {
  const { data, error } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_HOST_API}/user?page=${page}&limit=${limit}&search=${search}&sort=${filter} ${sort}`,
      token,
    ],
    fetcher,
    { refreshInterval: 5000 }
  );
  console.log(page, "inipage");
  return {
    contactUser: data,
    isLoading: !error && !data,
    isError: error,
  };
}
