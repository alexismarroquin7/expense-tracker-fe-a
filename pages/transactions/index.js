
// hooks
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../hooks";
import { useTheme } from "styled-components";

// store
import { transactionAction } from "../../store";

// components
import { Border, Button, Grid, Section } from "../../components";
import { NavBar, SearchBar, Transaction } from "../../widgets";

const initialTransactionToDelete = null;

export default function Transactions(){
  
  const dispatch = useDispatch();
  
  const { user } = useSelector(s => s.auth);
  
  const transaction = useSelector(s => {
    let stateToUse = {
      query: s.transaction.query,
    }

    if(s.transaction.query.search){
      const re = new RegExp(s.transaction.query.search, 'i');
      stateToUse.list = s.transaction.list.filter(trx => re.test(trx.name));
      
    } else {
      stateToUse.list = s.transaction.list;
    }
    return stateToUse;
  });
  
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

  const theme = useTheme();

  return (
  <Section
    bgColor={theme.color.white.value}
    gap="1rem"
    padding="0"
  >
    <NavBar/>
    <Grid
      width="90%"
      justify="space-between"
      alignItems="center"
    >
      <h4>Transactions</h4>
      <Button
        onClick={() => {
          router.push('/transactions/new');
        }}
        text="New"
      />
    </Grid>

    <SearchBar/>
    
    {/* delete transaction modal */}
    {deleteTransactionModalActive && (
      <Grid
        position="fixed"
        zIndex="50"
        width="100%"
        height="100vh"
        top="0px"
        alignItems="center"
        justify="center"
      >
        
        <Grid
          width="90%"
          direction="column wrap"
          alignItems="center"
          gap="2rem"
          border=".2rem solid black"
          padding="2rem"
          borderRadius={theme.borderRadius.primary}
          bgColor={theme.color.white}
          boxShadow={theme.boxShadow.primary}
        >

          <h6>Are you sure you want to delete this transaction?</h6>

        
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
    >
      <Grid
        width="100%"
        justify="flex-start"
      >
        {transaction.query.search.length > 0 && <p>results: {transaction.list.length}</p>}
      </Grid>
      {transaction.list.length === 0 && (
        <Grid
          direction="column wrap"
          alignItems="center"
          gap="2rem"
        >
        <p>No transctions added yet...</p>
        <p>Click or tap {'"New"'} to start keeping track of earnings and expenses.</p>
        </Grid>
      )}
      {transaction.list.length > 0 && transaction.list.map((tran) => {
        return (
        <React.Fragment
          key={tran.transaction_id}
        >
          
          <Border
            bgColor={theme.color.black}
          />
          
          <Transaction
            transaction={tran}
            toggleDeleteModal={(transaction_id) => {
              toggleDeleteTransactionModalActive();
              setTransactionToDelete(transaction_id);
            }}
          />
          
        </React.Fragment>
      )})}
    </Grid>

    
  </Section> 
  )
}