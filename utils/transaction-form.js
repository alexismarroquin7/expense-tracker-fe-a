import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "./get-current-date";

const options = {
  transaction_types: [
    {
      transaction_type_id: uuidv4(),
      name: 'Deposit'
    },
    {
      transaction_type_id: uuidv4(),
      name: 'Withdrawl'
    }
  ]
}

const initialValues = {
  name: '',
  description: '',
  type: '',
  date: getCurrentDate(),
  amount: '',
  tag: '',
  tags: [],
  tagTextSet: new Set()
}

export const transactionForm = {
  initialValues,
  options
}