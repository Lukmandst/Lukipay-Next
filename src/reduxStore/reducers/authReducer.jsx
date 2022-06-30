import {
  POST_USER_LOGIN,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAIL,
  DELETE_AUTH,
} from "../actions/authActions";

const initialState = {
  isloading: false,
  // loginData: false,
  isError: false,
  errorMsg: false,
  token: false,
  pin: false,
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN:
      return {
        ...prevState,
        isloading: true,
        // loginData: action.payload.data,
        isError: false,
        errorMsg: false,
        pin: false,
        token: false,
      };
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...prevState,
        isloading: false,
        // loginData: action.payload.data,
        token: action.payload.token,
        pin: action.payload.pin,
        isError: false,
        errorMsg: false,
      };
    case POST_USER_LOGIN_FAIL:
      return {
        ...prevState,
        isloading: false,
        // loginData: action.payload.data,
        pin: false,
        token: false,
        isError: false,
        errorMsg: action.payload.errorMsg
      };
    case DELETE_AUTH:
      return {
        ...initialState,
      };

    default:
      return prevState;
  }
};

export default authReducer;
