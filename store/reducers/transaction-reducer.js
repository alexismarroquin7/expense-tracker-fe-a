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
        loading: true
      };
    case transactionAction.FIND.BY.USER.ID.SUCCESS:
      return {
        ...state,
        loading: false
      };
    case transactionAction.FIND.BY.USER.ID.FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}