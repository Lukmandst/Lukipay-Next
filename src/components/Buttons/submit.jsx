import Loading from "components/Loading";
import { useSelector } from "react-redux";

function SubmitBtn({ value, onClick, disabled = false, loadingLocal }) {
  const { isloading } = useSelector((state) => state.auth);
  // if (isloading) {
  // }
  return (
    <>
      {isloading ? (
        <Loading />
      ) : loadingLocal ? (
        <Loading />
      ) : (
        <input
          type="submit"
          value={value}
          onClick={onClick}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default SubmitBtn;
