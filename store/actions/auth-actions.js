import { axiosInstance as axios } from "../../utils";

const ACTION = {
  LOGIN: {
    START: "AUTH__LOGIN--START",
    SUCCESS: "AUTH__LOGIN--SUCCESS",
    FAIL: "AUTH__LOGIN--FAIL"
  },
  LOGOUT: {
    START: "AUTH__LOGOUT--START",
    SUCCESS: "AUTH__LOGOUT--SUCCESS",
    FAIL: "AUTH__LOGOUT--FAIL"
  },
  REQUEST_SIGN_UP: {
    START: "AUTH__REQUEST_SIGN_UP--START",
    SUCCESS: "AUTH__REQUEST_SIGN_UP--SUCCESS",
    FAIL: "AUTH__REQUEST_SIGN_UP--FAIL",
    RESET: "AUTH__REQUEST_SIGN_UP--RESET"
  },
  SIGN_UP: {
    START: "AUTH__SIGN_UP--START",
    SUCCESS: "AUTH__SIGN_UP--SUCCESS",
    FAIL: "AUTH__SIGN_UP--FAIL"
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

const logout = () => async dispatch => {
  dispatch({
    type: ACTION.LOGOUT.START
  })
  
  try {
    dispatch({
      type: ACTION.LOGOUT.SUCCESS
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.LOGOUT.FAIL,
      payload: {
        error: {
          message: err ? err : 'an error occured'
        }
      }
    })

  }
}

const requestSignUp = (email) => async dispatch => {
  dispatch({
    type: ACTION.REQUEST_SIGN_UP.START
  })
  
  try {
    await axios().post('/auth/request-register', email)
    dispatch({
      type: ACTION.REQUEST_SIGN_UP.SUCCESS
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.REQUEST_SIGN_UP.FAIL,
      payload: {
        error: {
          message: err.response 
          ? err.response.data.message 
          : 'an error occured'
        }
      }
    })

  }
}

const signUp = (credentials) => async dispatch => {
  dispatch({
    type: ACTION.SIGN_UP.START
  })
  
  try {
    const res = await axios().post(
      '/auth/register', 
      {
        email: credentials.email,
        password: credentials.password
      },
      {
        headers: {
          authorization: credentials.token
        }
      }
    );

    dispatch({
      type: ACTION.SIGN_UP.SUCCESS,
      payload: {
        user: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.SIGN_UP.FAIL,
      payload: {
        error: {
          message: err.response 
          ? err.response.data.message 
          : 'an error occured'
        }
      }
    })

  }
}

const resetRequestSignUp = () => {
  return {
    type: ACTION.REQUEST_SIGN_UP.RESET
  }
}

export const authAction = {
  ...ACTION,
  login,
  logout,
  requestSignUp,
  signUp,
  resetRequestSignUp
}