import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Grid, Section } from "../../components";
import { transactionAction } from "../../store/actions";
import { Transaction, SearchBar } from "../../widgets";

// const calcBalance = (list) => {
//   return list.reduce((acc, curr) => {
    
//     /deposit/i.test(curr.transaction_type.name)
//     ? acc += curr.amount
//     : acc -= curr.amount

//     return acc;
//   }, 0)
// }

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
    
    {/* <Grid
      width="90%"
      justify="space-between"
      alignItems="center"
    >
      <h5>Balance</h5>
      {transaction.list.length > 0 && (
        <h6
          style={{
            color: calcBalance(transaction.list) > 0
            ? 'green'
            : 'red'
          }}
        >${calcBalance(transaction.list)}</h6>
      )}
    </Grid> */}

    {/* <SearchBar/> */}
    
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