

// hooks
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { Grid, Button, Section } from "../../components";
import { TransactionForm } from "../../widgets";

// store
import { transactionAction } from "../../store";

// utils
import { parseDateFromString, transactionForm } from "../../utils";

export default function NewTransaction(){
  
  const router = useRouter();
  const [values, setValues] = useState(transactionForm.initialValues)
  const dispatch = useDispatch();

  const transaction = useSelector(s => s.transaction);

  const transactionListLengthRef = useRef(transaction.list.length);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if(!transactionForm.valid(values)) return;
    
    dispatch(transactionAction.create({
      
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
    if(transaction.list.length > transactionListLengthRef.current){
      setTimeout(() => {
        router.push('/transactions')
      }, 2000)
    }
  }, [router, transaction.list.length])

  return (
  <Section>
    <Grid>
      <h3>New Transaction</h3>
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
              router.push('/transactions')
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