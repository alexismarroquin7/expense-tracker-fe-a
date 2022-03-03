import { transactionAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  filters: {
    sortBy: 'date',
    dir: 'asc'
  }
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
            ...state.status.error,
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
            ...state.status.error,
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
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      };
    case transactionAction.CREATE.START:
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
    case transactionAction.CREATE.SUCCESS:
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
        list: [
          ...state.list,
          action.payload.transaction
        ]
      };
    case transactionAction.CREATE.FAIL:
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