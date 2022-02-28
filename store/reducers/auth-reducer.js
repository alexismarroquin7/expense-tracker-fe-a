import { authAction } from "..";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  user: {},
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
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
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