import axios from "axios";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL";
export const PATCH_UPDATE_USER = "PATCH_UPDATE_USER";
export const DEL_USER_INFO = "DEL_USER_INFO";
export const RESET_USER_STATE = "RESET_USER_STATE";

export const getUserInfo = ({ token }) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_USER_INFO,
      payload: {
        loading: true,
        data: [],
        error: false,
        errorMsg: false
      },
    });
    //get api
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLI_HOST_API}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        //success get api
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: {
            loading: false,
            data: result.data.data[0],
            error: false,
            errorMessage: false,
            
          },
        });
      })
      .catch((error) => {
        console.log(error);
        //failed get api
        dispatch({
          type: GET_USER_INFO_FAIL,
          payload: {
            loading: false,
            data: false,
            error: true,
            errorMessage: error.response ? error.response.data.err.msg : error.message,
          },
        });
      });
  };
};

export const updateUser = ({ token, username, email, gender, address, description, photo, store_name }) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: PATCH_UPDATE_USER,
      payload: {
        loading: true,
        data: [],
        errorMessage: false,
        isSuccess: false,
      },
    });
    axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_HOST_API}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        username,
        email,
        gender,
        address,
        description,
        photo,
        store_name,
      },
      timeout: 3000,
    })
      .then((result) => {
        console.log("3. success get data");
        //success get api
        dispatch({
          type: PATCH_UPDATE_USER,
          payload: {
            loading: false,
            data: result.data.data[0],
            errorMessage: false,
            isSuccess: true,
          },
        });
      })
      .catch((error) => {
        console.log("3. failed get data");

        //failed get api
        dispatch({
          type: PATCH_UPDATE_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response,
            isSuccess: false,
          },
        });
      });
  };
};

export const logOutFromServer = ({ token }) => {
  return (dispatch) => {
    dispatch({
      type: DEL_USER_INFO,
      payload: {
        loading: true,
        data: [],
        errorMessage: false,
        isSucces: false,
        isUpdate: false,
      },
    });
    //get api
    axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_HOST_API}/auth`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 3000,
    })
      .then((result) => {
        //success get api
        dispatch({
          type: DEL_USER_INFO,
          payload: {
            loading: false,
            data: result.data.data.message,
            errorMessage: false,
            isSucces: true,
            isUpdate: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_INFO,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.err,
            isSuccess: false,
            isUpdate: false,
          },
        });
      });
  };
};

export const resetUserState = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_USER_STATE",
    });
  };
};