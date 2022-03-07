import { Button, DateInput, Grid, Label, TextField } from "../../components"
import { SearchIcon } from "../../components/Icons/SearchIcon"
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { transactionAction } from "../../store";
import { useRouter } from "next/router";
import { useState } from "react";
const options = {
  sortBy: [
    {
      id: uuidV4(),
      name: 'Date',
      value: 'date'
    }
  ],
  order: [
    {
      id: uuidV4(),
      name: 'Newest',
      value: 'desc'
    },
    {
      id: uuidV4(),
      name: 'Oldest',
      value: 'asc'
    }
  ]
}


export const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    router.query[name] = value;
    
    dispatch(transactionAction.setQuery(name, value))
    
    if(router.query.sortBy && router.query.dir){
      router.push(`/transactions?sortBy=${router.query.sortBy}&dir=${router.query.dir}`)
    
    } else if(router.query.sortBy && !router.query.dir){
      router.push(`/transactions?sortBy=${router.query.sortBy}`)
      
    } else if(!router.query.sortBy && router.query.dir){
      router.push(`/transactions?dir=${router.query.dir}`)
    
    } else {
      router.push(`/transactions`)

    }
  }

  return (
  <Grid
    direction="column wrap"
    gap="2rem"
  >
    <Grid
      width="90vw"
      justify="space-between"
      alignItems="center"
    >
      <TextField
        width="90%"
        padding="1rem"
        placeholder="Search by name"
      />
      <SearchIcon
        width={"10%"}
        border="1px solid black"
      />
    </Grid>

    <Grid
      width="100%"
      justify="center"
      alignItems="center"
      gap="1rem"
    >

      <Grid
        direction="column wrap"
        alignItems="center"
        gap="1rem"
      >
        <p>Sort By:</p>
        
        <select
          name="sortBy"
          onChange={handleChange}
        >
          {options.sortBy.map((sortByType) => {
            return (
            <option
              key={sortByType.id}
              value={sortByType.value}
            >{sortByType.name}</option>
            )
          })}
        </select>
      </Grid>


      <Grid
        direction="column wrap"
        alignItems="center"
        gap="1rem"
      >
        <p>Order:</p>
        <select
          name={"dir"}
          value={router.query.dir}
          onChange={handleChange}
        >
          {options.order.map(orderType => {
            return (
            <option
              key={orderType.id}
              value={orderType.value}
            >{orderType.name}</option>
            )
          })}
        </select>  
      </Grid>

    </Grid>

  </Grid>
  )
}