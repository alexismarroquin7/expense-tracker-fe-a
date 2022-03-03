import { useRouter } from "next/router"
import { Border, Button, DateInput, Grid, Label, Section, TextArea, TextField } from "../../components"
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../../store";

const options = {
  transaction_types: [
    {
      id: uuidv4(),
      name: 'Deposit'
    },
    {
      id: uuidv4(),
      name: 'Withdrawl'
    }
  ],
  tags: []
}

const parseDateFromString = (dateString) => {
  const dateArr = dateString.split('-');
  
  return {
    year: Number(dateArr[0]),
    month: Number(dateArr[1]),
    day: Number(dateArr[2])
  }
}

const getCurrentDate = () => {
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
  date: getCurrentDate(),
  amount: '',
  tag: '',
  tags: [],
  tagTextSet: new Set()
}

export default function NewTransaction(){
  
  const router = useRouter();
  const [values, setValues] = useState(initialFormValues)
  const dispatch = useDispatch();

  const transaction = useSelector(s => s.transaction);

  const transactionListLengthRef = useRef(transaction.list.length);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = () => {
      let passedValidation;

      if(
        values.type !== '' &&
        values.name !== '' &&
        /^\$?[0-9]+(\.[0-9][0-9])?$/.test(values.amount) &&
        values.date !== ''
      ){
        passedValidation = true;
      } else {
        passedValidation = false;
      }

      return passedValidation;
    }

    if(!valid()) return;
    
    dispatch(transactionAction.create({
      
      name: values.name,
      
      description: values.description.length > 0
      ? values.description
      : null,
      
      amount: Number(values.amount),

      date: {
        ...parseDateFromString(values.date)
      },
      
      type: values.type,

      tags: values.tags

    }));
  
  }

  useEffect(() => {
    if(transaction.list.length > transactionListLengthRef.current){
      setTimeout(() => {
        router.push('/transactions')
      }, 2000)
    }
  }, [router, transaction.list.length])

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
                />{type.name}
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
            autoComplete="off"
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
              direction="row wrap"
              alignItems="center"
              gap="1rem"
            >  
              <TextField
                name={"tag"}
                value={values.tag}
                onChange={handleChange}
                autoComplete="off"
              />
              <Button
                type="submit"
                text="Add"
                onClick={(e) => {
                  e.preventDefault();

                  if(values.tagTextSet.has(values.tag)) return; // prevents duplicate entries

                  const index = values.tags.length;
                  
                  values.tags.push({
                    tag_id: uuidv4(),
                    index,
                    text: values.tag
                  });

                  values.tagTextSet.add(values.tag);

                  setValues({
                    ...values,
                    tag: initialFormValues.tag
                  })

                }}
              ></Button>
            </Grid>
          
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
                <p
                  onClick={() => {
                    values.tagTextSet.delete(tag.text);
                    setValues({
                      ...values,
                      tags: values.tags.filter(valTag => valTag.tag_id !== tag.tag_id)
                    })
                  }}
                >x</p>
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