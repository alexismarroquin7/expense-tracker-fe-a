import { useRouter } from "next/router"
import { Border, Button, DateInput, Grid, Label, Section, TextArea, TextField } from "../../components"
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const options = {
  transaction_types: [
    {
      id: uuidv4(),
      name: 'Deposit'
    },
    {
      id: uuidv4(),
      name: 'Widthdrawl'
    }
  ],
  tags: []
}

const getDate = () => {
  const d = new Date();
  
  
  const year = d.getFullYear();
  
  const offset = 1;
  const month = d.getMonth() + offset;
  
  const day = d.getDate();

  return `${year}-${`${month < 10 ? '0' : ''}${month}`}-${`${day < 10 ? '0' : ''}${day}`}`
}

const initialFormValues = {
  name: '',
  description: '',
  type: '',
  date: getDate(),
  amount: '',
  tags: [
    {
      id: uuidv4(),
      text: 'hello'
    },
    {
      id: uuidv4(),
      text: 'world'
    },
  ]
}

export default function NewTransaction(){
  
  const router = useRouter();
  const [values, setValues] = useState(initialFormValues)
  
  useEffect(() => {
    console.log(values)
  }, [values])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
  <Section>
    <Grid>
      <h3>New Transaction</h3>
    </Grid>

    <form
      onSubmit={handleSubmit}
    >
      <Grid
        width="50vw"
        border=".2rem solid black"
        borderRadius="10px"
        direction="column wrap"
        padding="2rem"
        gap="2rem"
      >
        
        <Grid
          width="100%"
          justify="space-between"
        >
          <p>Type:</p>
          
          <Grid
            direction="column wrap"
            gap="2rem"
          >
            {options.transaction_types.map(type => (
              <Label
                key={type.id}
                alignItems="center"
                gap="1rem"
              >
                <input
                  type="radio"
                  name="type"
                  value={type.name.toLowerCase()}
                  checked={values.type === type.name.toLowerCase()}
                  onChange={handleChange}
                />
                {type.name}
              </Label>
            ))}
          </Grid>
        </Grid>

        <Border
          width="100%"
          bgColor="black"
        />

        <Label
          width="100%"
          justify="space-between"
          text="Date:"
          gap="1rem"
        >
          <DateInput
            name="date"
            value={values.date}
            onChange={handleChange}
          />
        </Label>

        <Border
          width="100%"
          bgColor="black"
        />

        <Label
          width="100%"
          justify="space-between"
          text="Name:"
        >

          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Label>

        <Border
          width="100%"
          bgColor="black"
        />
        
        <Label
          width="100%"
          justify="space-between"
          text="Description:"
        >
          <TextArea
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </Label>
        
        <Border
          width="100%"
          bgColor="black"
        />

        <Label
          width="100%"
          justify="space-between"
          text="Amount:"  
        >
          <TextField
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleChange}
          />
        </Label>
        
        <Border
          width="100%"
          bgColor="black"
        />

        <Grid
          width="100%"
          gap="2rem"
          justify="space-between"
        >
          <p
            style={{
              width: "100%"
            }}
          >Tags:</p>
          
          <Grid
            width="100%"

            border="1px solid black"
            gap="1rem"
            padding={values.tags.length > 0 ? "1rem" : "2rem"}
          >

            {values.tags.map(tag => {
              return (
              <Grid
                key={uuidv4()}
                border="1px solid black"
                padding=".5rem 1rem"
                borderRadius="10px"
                gap="1rem"
              >
                <p>{tag.text}</p>
                <p>x</p>
              </Grid>

              )
              
            })}
          </Grid>
        </Grid>
      

        <Border
          width="100%"
          bgColor="black"
        />

        {/* BUTTONS */}
        <Grid
          gap="2rem"
        >

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