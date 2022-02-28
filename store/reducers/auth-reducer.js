import { authAction } from "..";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  user: {},
  token: '',
  loggedIn: false
}

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case authAction.LOGIN.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      };
    case authAction.LOGIN.SUCCESS:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        user: action.payload.data.user,
        token: action.payload.data.token,
        loggedIn: true
      };
    case authAction.LOGIN.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      };
    default:
      return state;
  }
}