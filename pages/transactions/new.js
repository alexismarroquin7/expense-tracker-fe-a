import { useRouter } from "next/router"
import { Button, DateInput, Grid, Section, TextArea, TextField } from "../../components"

export default function NewTransaction(){
  
  const router = useRouter();
  
  return (
  <Section>
    <Grid>
      <h3>New Transaction</h3>
    </Grid>

    <form>
      <Grid
        direction="column wrap"
      >
        <DateInput
        
        />

        <TextField
          name="name"
          placeholder="name"
        />
        
        <TextArea
          name="description"
          placeholder="description"
        />

        <TextField
          type="number"
          name="amount"
          placeholder="amount"
        />

        <Grid>

          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push('/transactions')
            }}
            text="Cancel"
            />
          <Button
            text="Save"
          />
        
        </Grid>
      
      </Grid>
      
    </form>

  </Section>
  )
}