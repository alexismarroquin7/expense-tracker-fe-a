import { Grid, Label, Border, DateInput, TextField, TextArea, Button } from "../../components";
import { v4 as uuidv4 } from "uuid";

import { transactionForm } from "../../utils";
import { useTheme } from "styled-components";

export const TransactionForm = ({
  initialValues,
  values,
  setValues,
  onChange,
  onSubmit,
  actionArea: ActionArea
}) => {
  const theme = useTheme();  
  return (
  <form
    onSubmit={onSubmit}
  >
    <Grid
      width="100%"
      direction="column wrap"
      alignItems="center"
    >
      <Grid
        width="90%"
        border=".2rem solid black"
        borderRadius={theme.borderRadius.primary}
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
            {transactionForm.options.transaction_types.map(type => (
              <Label
                key={type.transaction_type_id}
                alignItems="center"
                gap="1rem"
              >
                <input
                  type="radio"
                  name="type"
                  value={type.name.toLowerCase()}
                  checked={values.type === type.name.toLowerCase()}
                  onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
          gap="1rem"
        >
          <TextArea
            bgColor={theme.color.four.value}
            width="100%"
            name="description"
            value={values.description}
            onChange={onChange}
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
            onChange={onChange}
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
                onChange={onChange}
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
                    tag: initialValues.tag
                  })

                }}
              ></Button>
            </Grid>
          
          <Grid
            width="100%"
            borderRadius="10px"
            bgColor={theme.color.four.value}
            gap="1rem"
            padding={values.tags.length > 0 ? "1rem" : "2rem"}
          >
            {values.tags.map(tag => {
              return (
              <Grid
                key={uuidv4()}
                border="1px solid black"
                padding=".5rem 1rem"
                borderRadius={theme.borderRadius.primary}
                gap="1rem"
              >
                <p>{tag.text}</p>
                <p
                  onClick={() => {
                    values.tagTextSet.delete(tag.text);
                    setValues({
                      ...values,
                      tags: values.tags
                      .filter(valTag => valTag.tag_id !== tag.tag_id)
                      .map((valTag, i) => {
                        valTag.index = i
                        return valTag;
                      })
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

        <ActionArea/>

      </Grid>
    </Grid>
    
  </form>
  )
}