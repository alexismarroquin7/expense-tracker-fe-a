import { Button, Grid } from "../../components";
import { useToggle } from "../../hooks";
import { Tag } from "..";

export const Transaction = ({ transaction, toggleDeleteModal }) => {
  const {active: open, toggle: toggleOpen} = useToggle();

  const handleOpen = e => {
    e.stopPropagation();
    toggleOpen();
  }

  return (
  <Grid
    border=".2rem solid black"
    borderRadius="10px"
    padding="2rem"
    width="100%"
    gap="1rem"
  >  
    <Grid
      width="100%"
      alignItems="center"
      justify="space-between"
    >
      
      {/* DATE */}
      <p>
        {transaction.date_month < 10 
        ? `0${transaction.date_month}`
        : transaction.date_month}
        {' / '}
        {transaction.date_day < 10 
        ? `0${transaction.date_day}`
        : transaction.date_day}
        {' / '}
        {transaction.date_year}
      </p>
      
      

      <button
        onClick={handleOpen}
      >{open ? '-' : '+'}</button>
    
    </Grid>

    <Grid
      width="100%"
      alignItems="center"
      justify="space-between"
    >
      
      <h6>{transaction.name}</h6>

      <p
        style={{
          color: /deposit/i.test(transaction.transaction_type.name)
          ? 'green'
          : 'red'
        }}
      >
        {/deposit/i.test(transaction.transaction_type.name)
        ? '+ '
        : '- '}

        ${transaction.amount.toFixed(2)}
      </p>
    </Grid>

    <Grid
      width="100%"
      alignItems="center"
      justify="space-between"
    >
    
      <div
        style={{
          transition: ".5s",
          width: open 
          ? '100%'
          : '5%',
          padding: ".2rem",
          backgroundColor: /deposit/i.test(transaction.transaction_type.name)
          ? 'green'
          : 'red'
        }}
      ></div>

      
    
    </Grid>
    
    {
      open && (
        <Grid
          width="100%"
          direction="column wrap"
          alignItems="flex-start"
          justify="space-between"
          gap="4rem"
          transition=".5s"

        >

          <Grid
            width="100%"
            gap="1rem"
          >
            <p>Description:</p>

            <Grid
              width="100%"
              padding={`${transaction.description ? "1rem" : "2rem"}`}
              borderRadius="10px"
              bgColor="#E0E0E0"
            > 
              <p>{transaction.description}</p>
            </Grid> 

          </Grid>

          <Grid
            width="100%"
            gap="1rem"
          >

            <p>Tags:</p>
            
            <Grid
              width="100%"
              padding={`${transaction.tags.length > 0 ? "1rem" : "2rem"}`}
              borderRadius="10px"
              bgColor="#E0E0E0"
              gap="1rem"
            > 
              {transaction.tags.length > 0 && transaction.tags.map(tag => {
                return (
                <Tag
                  key={tag.tag_id}
                  tag={tag}
                />
                )
              })}
            </Grid>

          </Grid>

          <Grid
            width="100%"
            gap="1rem"
          >
            <Button
              text="Edit"
            />
            <Button
              text="Delete"
              onClick={() => {
                toggleDeleteModal(transaction.transaction_id);
              }}
            />
          </Grid>

        </Grid>
      )
    }
  
  </Grid>
  )
}