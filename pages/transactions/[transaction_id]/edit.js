// hooks
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// store
import { transactionAction } from "../../../store";

// components
import { Grid, Section } from "../../../components";
import { TransactionForm } from "../../../widgets";


export default function EditTransaction(){
  
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionAction.findById(router.query.transaction_id));
  }, [dispatch, router.query.transaction_id]);

  return (
  <Section>

    <TransactionForm/>

  </Section>
  )
}