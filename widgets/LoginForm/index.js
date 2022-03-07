import Link from "next/link";
import { useDispatch } from "react-redux";
import { Form, TextField, Button, Grid } from "../../components"
import { useForm } from "../../hooks";
import { authAction } from "../../store";

const initialFormValues = {
  email: '',
  password: ''
}

export const LoginForm = () => {
  const {
    values: credentials,
    handleChange,
    clear
  } = useForm(initialFormValues);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authAction.login(credentials))
    clear()
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
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
        />
        
        <TextField
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        
        <Button
          type="submit"
          text="Login"
        />

        <p>Dont have an account? <Link href="/auth/sign-up"><a>Sign Up</a></Link></p>
        
      </Grid>
    </Grid>
  </Form>
  )
}