import {
  GET_USER_INFO,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
} from "reduxStore/actions/userActions";

const initialState = {
  isloading: false,
  userData: false,
  isError: false,
  errorMsg: false,
  updateResult: false,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...prevState,
        isloading: action.payload.loading,
        userData: action.payload.data,
        isError: action.payload.error,
        errorMsg: action.payload.errorMsg,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...prevState,
        isloading: action.payload.loading,
        userData: action.payload.data,
        isError: action.payload.error,
        errorMsg: action.payload.errorMsg,
      };
    case GET_USER_INFO_FAIL:
      return {
        ...prevState,
        isloading: action.payload.loading,
        userData: action.payload.data,
        isError: action.payload.error,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default userReducer;
