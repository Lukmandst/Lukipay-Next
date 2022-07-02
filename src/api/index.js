import useSWR from "swr";
import axios from "axios";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data.data);

export default function GetUser(id, token) {
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
