import { Border, Button, Grid } from "../../components";
import { useToggle } from "../../hooks";
import { Tag } from "..";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";

export const Transaction = ({ transaction, toggleDeleteModal }) => {
  const {
    active: open,
    toggle: toggleOpen
  } = useToggle();

  const router = useRouter();

  const handleOpen = e => {
    e.stopPropagation();
    toggleOpen();
  }

  const theme = useTheme();

  return (
  <Grid
    padding="2rem 0rem"
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
      
      

      <Button
        onClick={handleOpen}
        padding=".5rem 1rem"
        text={open ? '-' : '+'}
        bgColor={theme.color.four.value}
      />
    
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
    
      <Border

        transition=".5s"
        width={open ? '100%' : '5%'}
        padding=".2rem"
        bgColor={
          /deposit/i.test(transaction.transaction_type.name)
          ? 'green'
          : 'red'
        }
      />
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
              borderRadius={theme.borderRadius.primary}
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
              onClick={() => {
                router.push(`/transactions/${transaction.transaction_id}/edit`)
              }}
              
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