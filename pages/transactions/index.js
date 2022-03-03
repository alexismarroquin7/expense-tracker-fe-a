import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Grid, Section } from "../../components";
import { transactionAction } from "../../store/actions";
import { Transaction } from "../../widgets";

export default function Transactions(){
  
  const dispatch = useDispatch();
  
  const { user } = useSelector(s => s.auth);
  const transaction = useSelector(s => s.transaction);
  const router = useRouter();

  useEffect(() => {
    dispatch(transactionAction.findByUserId(user.user_id));
  }, [dispatch, user.user_id]);

  return (
  <Section
    gap="1rem"
  >
    <Grid
      width="90%"
      justify="space-between"
      alignItems="center"
    >
      <h3>Transactions</h3>
      <button
        onClick={() => {
          router.push('/transactions/new');
        }}
      >New</button>
    </Grid>
    
    <Grid
      width="90%"
      direction="column wrap"
      alignItems="center"
      gap="2rem"
    >
      {transaction.list.length > 0 && transaction.list.map(tran => {
        
        return <Transaction
          key={tran.transaction_id}
          transaction={tran}
        />
      })}
    </Grid>
  </Section> 
  )
}