import { useForm } from "../../hooks";


import { Form, Grid, TextField, Button } from "../../components";
import Link from "next/link"
import { useTheme } from "styled-components";

const initialFormValues = {
  email: ''
}

export const SignUpForm = () => {
  const {
    values: credentials,
    handleChange,
    clear
  } = useForm(initialFormValues);
  
  const handleSubmit = e => {
    e.preventDefault();
  }

  const theme = useTheme();

  return (
  <Form
    // borderRadius={theme}
    bgColor={theme.color.white}
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
        <h2>Sign Up</h2>

        <p>Enter a valid email to recieve a confirmation link</p>

        <TextField
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
        />
        
        <Button
          type="submit"
          text="Sign Up"
        />
 
        <p>Already have an account? <Link href="/auth/login"><a>Login</a></Link></p>
        
      </Grid>
    </Grid>
  </Form>
  )

}