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
  }
}

const findByUserId = (user_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.USER.ID.START
  })
  
  try {
    const res = await axiosWithAuth().get(`/transactions?user_id=${user_id}`);
    
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

export const transactionAction = {
  ...ACTION,
  findByUserId
}