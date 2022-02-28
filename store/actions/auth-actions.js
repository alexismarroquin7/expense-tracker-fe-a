import { axiosInstance as axios } from "../../utils";

const ACTION = {
  LOGIN: {
    START: "AUTH__LOGIN--START",
    SUCCESS: "AUTH__LOGIN--SUCCESS",
    FAIL: "AUTH__LOGIN--FAIL"
  }
}

const login = (credentials) => async dispatch => {
  dispatch({
    type: ACTION.LOGIN.START
  })

  try {
    const res = await axios().post(`/auth/login`, credentials);
    dispatch({
      type: ACTION.LOGIN.SUCCESS,
      payload: {
        data: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.LOGIN.FAIL,
      payload: {
        error: {
          message: err.response.data.message 
          ? err.response.data.message
          : 'an error occured'
        }
      }
    })
  }
}

export const authAction = {
  ...ACTION,
  login
}