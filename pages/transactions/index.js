
// hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../hooks";

// store
import { transactionAction } from "../../store";

// components
import { ArrowIcon, Button, FilterListIcon, Grid, Section } from "../../components";
import { SearchBar, Transaction } from "../../widgets";

const initialTransactionToDelete = null;

export default function Transactions(){
  
  const dispatch = useDispatch();
  
  const { user } = useSelector(s => s.auth);
  
  const transaction = useSelector(s => s.transaction);
  
  const router = useRouter();
  
  const { 
    active: deleteTransactionModalActive,
    toggle: toggleDeleteTransactionModalActive
  } = useToggle();

  const [transactionToDelete, setTransactionToDelete] = useState(initialTransactionToDelete);

  useEffect(() => {
    dispatch(transactionAction.findByUserId(user.user_id, {
      sortBy: router.query.sortBy || 'date',
      dir: router.query.dir || 'desc'
    }));
  }, [dispatch, user.user_id, router.query.sortBy, router.query.dir]);

  
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

    <SearchBar/>
    
    {/* delete transaction modal */}
    {deleteTransactionModalActive && (
      <Grid
        border="1px solid red"
        position="fixed"
        zIndex="50"
        width="100%"
        height="100vh"
        top="0px"
        alignItems="center"
        justify="center"
      >
        
        <Grid
          direction="column wrap"
          alignItems="center"
          gap="2rem"
          border="1px solid black"
          padding="2rem"
          borderRadius="10px"
          bgColor="white"
          boxShadow="0px 2px 5rem black"
        >
          <h6>Delete transaction?</h6>
        
          <Grid
            direction="column wrap"
            alignItems="center"
            gap="1rem"
          >
          
            <Button
              text="Confirm Delete"
              onClick={() => {
                dispatch(transactionAction.deleteByTransactionId(transactionToDelete));
                setTransactionToDelete(initialTransactionToDelete);
                toggleDeleteTransactionModalActive();
              }}
            />
          
            <Button
              text="Cancel"
              onClick={() => {
                toggleDeleteTransactionModalActive();
                setTransactionToDelete(initialTransactionToDelete);
              }}
            />
          
          </Grid>
      
        </Grid>
      
      </Grid>
    )}

    <Grid
      width="90%"
      direction="column wrap"
      alignItems="center"
      gap="2rem"
    >
      {transaction.list.length > 0 && transaction.list.map(tran => (
        <Transaction
          key={tran.transaction_id}
          transaction={tran}
          toggleDeleteModal={(transaction_id) => {
            toggleDeleteTransactionModalActive();
            setTransactionToDelete(transaction_id);
          }}
        />
      ))}
    </Grid>

    
  </Section> 
  )
}