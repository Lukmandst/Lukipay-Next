import axios from 'axios'

export const POST_USER_LOGIN = "POST_USER_LOGIN";
export const POST_USER_LOGIN_SUCCESS = "POST_USER_LOGIN_SUCCESS";
export const POST_USER_LOGIN_FAIL = "POST_USER_LOGIN_FAIL";
export const DELETE_AUTH = "DELETE_AUTH";

export const authLogin = (data) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: POST_USER_LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMsg: false,
        isError: false,
        id: false,
      },
    });
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_HOST_API}/auth/login`,
      timeout: 3000,
      data: data,
    })
      .then((result) => {
        console.log(result);
        //success get api
        dispatch({
          type: POST_USER_LOGIN_SUCCESS,
          payload: {
            loading: false,
            data: result.data.data,
            pin: result.data.data.pin,
            token: result.data.data.token,
            id: result.data.data.id,
            errorMsg: false,
            isError: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        //failed get api
        dispatch({
          type: POST_USER_LOGIN_FAIL,
          payload: {
            loading: false,
            data: [],
            errorMsg: error.response ? error.response.data.msg : error.message,
            isError: true,
          },
        });
      });
  };
};

export const resetAuth = () => {
  return dispatch({
    type: DELETE_AUTH,
  });
};
