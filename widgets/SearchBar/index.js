
import { v4 as uuidV4 } from "uuid";

// components
import { Grid, Select, TextField, MenuItem, SearchIcon } from "../../components"

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToggle } from "../../hooks";
import { useTheme } from "styled-components";

// store
import { transactionAction } from "../../store";

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
      name: 'Newest To Oldest',
      value: 'desc'
    },
    {
      id: uuidV4(),
      name: 'Oldest To Newest',
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
  
  const { active: sortByOpen, toggle: sortByToggle } = useToggle();
  const { active: orderOpen, toggle: orderToggle } = useToggle();

  const theme = useTheme();

  useEffect(() => {
    dispatch(transactionAction.setQuery({
      search: router.query.search 
      ? router.query.search
      : search,
      sortBy: router.query.sortBy 
      ? router.query.sortBy
      : '',
      dir: router.query.dir
      ? router.query.dir
      : ''
    }))
  }, [dispatch, search, router.query.search, router.query.sortBy, router.query.dir])

  useEffect(() => {
    setSearch(() => router.query.search ? router.query.search : '')
  }, [router.query.search])
  
  const handleChange = e => {
    const { name, value } = e.target;

    if(name === 'search'){
      setSearch(value)
    } else {
      router.query[name] = value;
      dispatch(transactionAction.setQuery({
        search,
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

    dispatch(transactionAction.setQuery(router.query));
    
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
      alignItems="flex-start"
      gap="1rem"
    >

      <Grid
        direction="column wrap"
        alignItems="center"
        gap="1rem"
      >
        
        <Select
          label="Sort By"
          open={sortByOpen}
          toggleOpen={sortByToggle}
          value={transaction.query.sortBy ? options.sortBy.filter(opt => opt.value === transaction.query.sortBy)[0].name : ''}
          bgColor={theme.color.four.value}
        
        >
          {options.sortBy.map((sortByType) => {
            return (
            <MenuItem
              key={sortByType.id}
              value={sortByType.value}
              toggleOpen={sortByToggle}
              onClick={() => {
                handleChange({
                  target: {
                    name: 'sortBy',
                    value: sortByType.value
                  }
                })
              }}
            >{sortByType.name}</MenuItem>
            )
          })}
        </Select>

      </Grid>


      <Grid
        direction="column wrap"
        alignItems="center"
        gap="1rem"
      >
        <Select
          label="Order"
          open={orderOpen}
          toggleOpen={orderToggle}
          value={transaction.query.dir ? options.order.filter(opt => opt.value === transaction.query.dir)[0].name : ''}
          bgColor={theme.color.four.value}
        >
          {options.order.map((orderType) => {
            return (
            <MenuItem
              key={orderType.id}
              value={orderType.value}
              toggleOpen={orderToggle}
              onClick={() => {
                handleChange({
                  target: {
                    name: 'dir',
                    value: orderType.value
                  }
                })
              }}
            >{orderType.name}</MenuItem>
            )
          })}
        </Select>
        
      </Grid>

    </Grid>

  </Grid>
  )
}