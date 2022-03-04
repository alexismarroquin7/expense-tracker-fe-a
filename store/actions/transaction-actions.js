import { axiosWithAuth } from "../../utils";

const ACTION = {
  FIND: {
    BY: {
      USER: {
        ID: {
          START: "TRANSACTION__FIND__BY__USER__ID--START",
          SUCCESS: "TRANSACTION__FIND__BY__USER__ID--SUCCESS",
          FAIL: "TRANSACTION__FIND__BY__USER__ID--FAIL"
        }
      }
    }
  },
  CREATE: {
    START: "TRANSACTION__CREATE--START",
    SUCCESS: "TRANSACTION__CREATE--SUCCESS",
    FAIL: "TRANSACTION__CREATE--FAIL"
  },
  DELETE: {
    BY: {
      TRANSACTION: {
        ID: {
          START: "TRANSACTION__DELETE__BY__TRANSACTION__ID--START",
          SUCCESS: "TRANSACTION__DELETE__BY__TRANSACTION__ID--SUCCESS",
          FAIL: "TRANSACTION__DELETE__BY__TRANSACTION__ID--FAIL"
        }
      }
    }
  }
}

const findByUserId = (user_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.USER.ID.START
  })
  
  try {
    const res = await axiosWithAuth().get(`/transactions?user_id=${user_id}&sortBy=date&dir=desc`);
    
    dispatch({
      type: ACTION.FIND.BY.USER.ID.SUCCESS,
      payload: {
        transactions: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.USER.ID.FAIL,
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

const create = (transaction) => async dispatch => {
  dispatch({
    type: ACTION.CREATE.START
  })
  try {
    const res = await axiosWithAuth().post(`/transactions`, transaction);
    dispatch({
      type: ACTION.CREATE.SUCCESS,
      payload: {
        transaction: res.data
      }
    })
    
  } catch(err) {
    
    dispatch({
      type: ACTION.CREATE.FAIL,
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

const deleteByTransactionId = (transaction_id) => async dispatch => {
  dispatch({
    type: ACTION.DELETE.BY.TRANSACTION.ID.START
  });

  try {
    const res = await axiosWithAuth().delete(`/transactions/${transaction_id}`);
    dispatch({
      type: ACTION.DELETE.BY.TRANSACTION.ID.SUCCESS,
      payload: {
        transaction: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.DELETE.BY.TRANSACTION.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
          ? err.response.data.message
          : 'an error occured'
        }
      }
    });
  }
}

export const transactionAction = {
  ...ACTION,
  findByUserId,
  create,
  deleteByTransactionId
}