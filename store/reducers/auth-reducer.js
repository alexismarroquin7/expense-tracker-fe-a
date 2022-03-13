import { authAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  user: {},
  token: '',
  loggedIn: false,
  requestedSignUp: false
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
    
    case authAction.LOGOUT.START:
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
    case authAction.LOGOUT.SUCCESS:
      localStorage.removeItem('token')
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
        loggedIn: initialState.loggedIn,
        user: initialState.user,
        token: initialState.token
      };
    case authAction.LOGOUT.FAIL:
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
    
    case authAction.SIGN_UP.START:
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
        loggedIn: false,
        resquestedSignUp: false
      };
    case authAction.SIGN_UP.SUCCESS:
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
        user: action.payload.user,
        loggedIn: true
      };
    case authAction.SIGN_UP.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        },
        loggedIn: false
      };
    
    case authAction.REQUEST_SIGN_UP.START:
      return {
        ...state,
        status: {
          ...state.status,
          error: {
            ...state.status.error,
            message: ''
          }

        },
        requestedSignUp: false
      };
    case authAction.REQUEST_SIGN_UP.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          error: {
            ...state.status.error,
            message: ''
          }

        },
        requestedSignUp: true
      };
    case authAction.REQUEST_SIGN_UP.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }

        },
        requestedSignUp: false
      };

    case authAction.REQUEST_SIGN_UP.RESET:
      return {
        ...state,
        requestedSignUp: false
      }

    default:
      return state;
  }
}