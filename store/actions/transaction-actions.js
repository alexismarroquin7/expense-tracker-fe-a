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
      },
      TRANSACTION: {
        ID: {
          START: "TRANSACTION__FIND__BY__TRANSACTION__ID--START",
          SUCCESS: "TRANSACTION__FIND__BY__TRANSACTION__ID--SUCCESS",
          FAIL: "TRANSACTION__FIND__BY__TRANSACTION__ID--FAIL"
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
  },
  UPDATE: {
    BY: {
      TRANSACTION: {
        ID: {
          START: "TRANSACTION__UPDATE__BY__TRANSACTION__ID--START",
          SUCCESS: "TRANSACTION__UPDATE__BY__TRANSACTION__ID--SUCCESS",
          FAIL: "TRANSACTION__UPDATE__BY__TRANSACTION__ID--FAIL"
        }
      }
    }
  },
  SET_QUERY: 'TRANSACTION__SET__QUERY'
}

const findByUserId = (user_id, options) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.USER.ID.START
  })
  try {
    
    const sortBy = options.sortBy || 'date';
    const dir = options.dir || 'desc';

    const res = await axiosWithAuth()
    .get(`/transactions?user_id=${user_id}&sortBy=${sortBy}&dir=${dir}`);
    
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
          message: err.response
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
          message: err.response
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
          message: err.response
          ? err.response.data.message
          : 'an error occured'
        }
      }
    });
  }
}

const findById = (transaction_id) => async dispatch => {
  
  dispatch({
    type: ACTION.FIND.BY.TRANSACTION.ID.START
  });
  
  try {
    const res = await axiosWithAuth().get(`/transactions/${transaction_id}`);
    dispatch({
      type: ACTION.FIND.BY.TRANSACTION.ID.SUCCESS,
      payload: {
        transaction: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.TRANSACTION.ID.FAIL,
      payload: {
        error: {
          message: err.response
          ? err.response.data.message
          : 'an error occured'
        }
      }
    });
  }
}

const updateById = (transaction_id, changes) => async dispatch => {
  dispatch({
    type: ACTION.UPDATE.BY.TRANSACTION.ID.START 
  })

  try {
    const res = await axiosWithAuth().put(`/transactions/${transaction_id}`, changes);
    dispatch({
      type: ACTION.UPDATE.BY.TRANSACTION.ID.SUCCESS,
      payload: {
        transaction: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: ACTION.UPDATE.BY.TRANSACTION.ID.FAIL,
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

const setQuery = (key, value) => {
  return {
    type: ACTION.SET_QUERY,
    payload: {
      key, value
    }
  }
}

export const transactionAction = {
  ...ACTION,
  findByUserId,
  create,
  deleteByTransactionId,
  findById,
  updateById,
  setQuery
}