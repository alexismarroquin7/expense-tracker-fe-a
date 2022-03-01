
import { Grid } from "../../components";
import { useToggle } from "../../hooks";
import { Tag } from "..";

export const Transaction = ({transaction}) => {
  const {active: open, toggle: toggleOpen} = useToggle();
  
  const handleOpen = e => {
    e.stopPropagation();
    toggleOpen();
  }

  return (
  <Grid
    border="1px solid black"
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
      <h6>{transaction.name}</h6>
      <button
        onClick={handleOpen}
      >{open ? '-' : '+'}</button>
    </Grid>

    <Grid
      width="100%"
      alignItems="center"
      justify="space-between"
    >
    
      <div
        style={{
          padding: ".2rem 2rem",
          backgroundColor: /deposit/i.test(transaction.transaction_type.name)
          ? 'green'
          : 'red'
        }}
      ></div>

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
    
    {
      open && (
        <Grid
          width="100%"
          direction="column wrap"
          alignItems="flex-start"
          justify="space-between"
          gap="4rem"
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

        </Grid>
      )
    }
  
  </Grid>
  )
}