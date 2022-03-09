import { Grid, TextField } from "../../components"
import { SearchIcon } from "../../components/Icons/SearchIcon"
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../../store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      name: 'Most Recent',
      value: 'desc'
    },
    {
      id: uuidV4(),
      name: 'Least Recent',
      value: 'asc'
    }
  ]
}

const createQuery = (queryObj) => {
  let query = '?';
    
  if(queryObj.search){
    const searchQuery = `${query.length > 1 ? '&': ''}search=${queryObj.search.replace(' ', '+')}`;
    query += searchQuery;
  
  }
  
  if(queryObj.sortBy){
    const sortByQuery = `${query.length > 1 ? '&': ''}sortBy=${queryObj.sortBy}`;      
    query += sortByQuery;

  }
  
  if(queryObj.dir){
    const dirQuery = `${query.length > 1 ? '&': ''}dir=${queryObj.dir}`;
    query += dirQuery;

  }

  return query;
}

export const SearchBar = () => {
  const router = useRouter();

  const transaction = useSelector(s => s.transaction);
  const dispatch = useDispatch();

  const [search, setSearch] = useState(() => transaction.query.search ? transaction.query.search.replace('+', ' ') : '');
  
  useEffect(() => {
    dispatch(transactionAction.setQuery({
      search: router.query.search 
      ? router.query.search
      : '',
      sortBy: router.query.sortBy 
      ? router.query.sortBy
      : '',
      dir: router.query.dir
      ? router.query.dir
      : ''
    }))    
  }, [dispatch, router, router.query.search, router.query.sortBy, router.query.dir])

  useEffect(() => {
    setSearch(router.query.search)
  }, [router.query.search])
  
  const handleChange = e => {
    const { name, value } = e.target;
    
    if(name==='search'){
      setSearch(value)
    } else {
      router.query[name] = value;
        dispatch(transactionAction.setQuery({
        search: router.query.search 
        ? router.query.search
        : '',
        sortBy: router.query.sortBy 
        ? router.query.sortBy
        : '',
        dir: router.query.dir
        ? router.query.dir
        : ''
      }))    
    }

  
    const queryToUse = createQuery(router.query);
    router.push(`/transactions${queryToUse.length > 1 ? queryToUse : ''}`);
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    router.query.search = search.replace(' ', '+')

    const queryToUse = createQuery(router.query);
    router.push(`/transactions${queryToUse.length > 1 ? queryToUse : ''}`);
  }

  return (
  <Grid
    padding="2rem 0"
    direction="column wrap"
    gap="2rem"
  >
    <form
      onSubmit={handleSubmit}
    >
      <Grid
        width="90vw"
        justify="space-between"
        alignItems="center"
      >
        <TextField
          width="85%"
          padding="1rem"
          placeholder="Search by name"
          name="search"
          value={search}
          onChange={handleChange}
          autoComplete="off"
        />
        <SearchIcon
          width={"10%"}
          height={"1rem"}
          border="1px solid black"
          onClick={handleSubmit}
        />
      </Grid>
    </form>

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
          value={transaction.query.sortBy}
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
          value={transaction.query.dir}
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