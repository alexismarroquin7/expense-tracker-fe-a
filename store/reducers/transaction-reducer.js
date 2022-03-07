import { transactionAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {},
  queries: {
    sortBy: 'date',
    dir: 'desc',
    search: ''
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
    
    case transactionAction.DELETE.BY.TRANSACTION.ID.START:
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
    case transactionAction.DELETE.BY.TRANSACTION.ID.SUCCESS:
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
          ...state.list.filter(tran => (
            tran.transaction_id !== action.payload.transaction.transaction_id
          ))
        ]
      };
    case transactionAction.DELETE.BY.TRANSACTION.ID.FAIL:
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
    
    case transactionAction.FIND.BY.TRANSACTION.ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        item: {}
      };
    case transactionAction.FIND.BY.TRANSACTION.ID.SUCCESS:
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
        item: {
          ...action.payload.transaction
        }
      };
    case transactionAction.FIND.BY.TRANSACTION.ID.FAIL:
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
    
    case transactionAction.UPDATE.BY.TRANSACTION.ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        item: {}
      };
    case transactionAction.UPDATE.BY.TRANSACTION.ID.SUCCESS:
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
        item: {
          ...action.payload.transaction
        }
      };
    case transactionAction.UPDATE.BY.TRANSACTION.ID.FAIL:
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
    case transactionAction.SET_QUERY:
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.payload.key]: action.payload.value
        }
      }
    default:
      return state;
  }
}