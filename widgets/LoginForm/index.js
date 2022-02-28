import { Form, TextField, Button, Grid } from "../../components"
import { useForm } from "../../hooks";

const initialFormValues = {
  email: '',
  password: ''
}

export const LoginForm = () => {
  const {
    values,
    handleChange,
    
  } = useForm(initialFormValues);

  const handleSubmit = e => {
    e.preventDefault();
    
    
  }

  return (
  <Form
    onSubmit={handleSubmit}
  >
    <Grid
      direction="column wrap"
      alignItems="center"
      
    >
      <Grid
        direction="column wrap"
        alignItems="center"
        gap="1rem"
        padding="1rem"
      >
        <h2>Login</h2>

        <TextField
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        
        <TextField
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        
        <Button
          type="submit"
          text="Submit"
        />
      </Grid>
    </Grid>
  </Form>
  )
}