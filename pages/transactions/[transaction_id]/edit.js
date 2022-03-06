// hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import { transactionAction } from "../../../store";

// components
import { Section, Grid, Button } from "../../../components";
import { TransactionForm } from "../../../widgets";

// utils
import { transactionForm, stringifyDate, parseDateFromString } from "../../../utils";


export default function EditTransaction(){
  
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [values, setValues] = useState(transactionForm.initialValues);

  const { item: transaction } = useSelector(s => s.transaction);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(!transactionForm.valid(values)) return;

    dispatch(transactionAction.updateById(
      router.query.transaction_id, {
      
      name: values.name,
      
      description: values.description.length > 0
      ? values.description
      : null,
      
      amount: Number(values.amount),

      date: {
        ...parseDateFromString(values.date)
      },
      
      type: values.type,

      tags: values.tags
    }));
  }

  useEffect(() => {
    dispatch(transactionAction.findById(router.query.transaction_id));
  }, [dispatch, router.query.transaction_id]);

  useEffect(() => {
    setValues(() => {
      return transaction.transaction_id ? {
        name: transaction.name,
        description: transaction.description === null
        ? ''
        : transaction.description,
        type: transaction.transaction_type.name,
        date: stringifyDate({
          year: transaction.date_year,
          month: transaction.date_month,
          day: transaction.date_day
        }),
        amount: String(transaction.amount.toFixed(2)),
        tag: '',
        tags: transaction.tags,
        tagTextSet: transaction.tags.length > 0 
        ? new Set(transaction.tags.map(tag => tag.text))
        : new Set()
      }
      : transactionForm.initialValues
    })
  }, [transaction])

  return (
  <Section>

    <Grid>
      <h3>Edit Transaction</h3>
    </Grid>

    <TransactionForm
      initialValues={transactionForm.initialValues}
      values={values}
      setValues={setValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      actionArea={() => (
        <Grid
          gap="2rem"
        >

          <Button
            onClick={(e) => {
              e.preventDefault();
              setValues(transactionForm.initialValues);
              // router.push(`/transactions/${router.query.transaction_id}`);
              router.push(`/transactions`);
            }}
            text="Cancel"
          />
          
          <Button
            text="Save"
          />
        
      </Grid>
      )}
    />

  </Section>
  )
}