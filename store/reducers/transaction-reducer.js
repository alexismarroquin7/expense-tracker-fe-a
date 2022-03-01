import { transactionAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: []
}

export const transactionReducer = (state = initialState, action) => {
  switch(action.type){
    case transactionAction.FIND.BY.USER.ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            message: ''
          }
        }
      };
    case transactionAction.FIND.BY.USER.ID.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            message: ''
          }
        },
        list: action.payload.transactions
      };
    case transactionAction.FIND.BY.USER.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            message: action.payload.error.message
          }
        }
      };
    default:
      return state;
  }
}