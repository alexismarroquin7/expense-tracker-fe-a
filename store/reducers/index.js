import { combineReducers } from "redux";

import { authReducer } from "./auth-reducer";
import { transactionReducer } from "./transaction-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer
});