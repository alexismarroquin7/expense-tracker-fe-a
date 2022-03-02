import { Grid, TextField } from "../../components"
import { SearchIcon } from "../../components/Icons/SearchIcon"
import { v4 as uuidV4 } from "uuid";

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
      name: 'Ascending',
      value: 'asc'
    },
    {
      id: uuidV4(),
      name: 'Descending',
      value: 'desc'
    }
  ]
}

export const SearchBar = () => {
  return (
  <Grid
    direction="column wrap"
  >
    <Grid
      width="100%"
      justify="space-between"
    >
      <TextField/>
      <SearchIcon/>
    </Grid>

    <Grid
      gap="1rem"
    >

      <Grid
        alignItems="center"
        gap="1rem"
      >
        <p>Sort By:</p>
        
        <select>
          {options.sortBy.map(sortByType => {
            return (
            <option
              key={sortByType.id}
            >{sortByType.name}</option>
            )
          })}
        </select>
      </Grid>


      <Grid
        alignItems="center"
        gap="1rem"
      >
        <p>Order:</p>
        <select>
          {options.order.map(orderType => {
            return (
            <option
              key={orderType.id}
            >{orderType.name}</option>
            )
          })}
        </select>  
      </Grid>

    </Grid>

  </Grid>
  )
}