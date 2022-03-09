import Link from "next/link";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { Form, TextField, Button, Grid, Label } from "../../components"
import { useForm, useToggle } from "../../hooks";
import { authAction } from "../../store";

const initialFormValues = {
  email: '',
  password: ''
}

export const LoginForm = () => {
  const dispatch = useDispatch();
  
  const {
    values: credentials,
    handleChange,
    clear
  } = useForm(initialFormValues);

  const { 
    active: hidePassword, toggle: toggleHidePassword
  } = useToggle(true);
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authAction.login(credentials));
    clear();
  }
  
  const theme = useTheme();
  
  return (
  <Form
    onSubmit={handleSubmit}
    boxShadow={theme.boxShadow.primary}
    borderRadius="5px"
    padding="2rem"
    bgColor={theme.color.white}
  >
    <Grid
      direction="column wrap"
      alignItems="center"
    >
      <Grid
        direction="column wrap"
        alignItems="center"
        gap="4rem"
      >
        <Grid
          width="100%"
          direction="column wrap"
          alignItems="center"
        >
          <h5>Login</h5>
        </Grid>

        <Grid
          width="100%"
          direction="column wrap"
          alignItems="center"
          gap="2rem"
        >
          <Label
            width="100%"
            text="Email:"
            gap="1rem"
          >
            <TextField
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              width="100%"  
              autoComplete="off"
            />
          </Label>
          
          <Label
            width="100%"
            text="Password:"
            gap="1rem"
          >
            <TextField
              type={hidePassword ? "password" : "text"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              width="100%" 
              autoComplete="off"
            />
          </Label>

          <Grid
            width="100%"
          >
            <Label
              direction="row-reverse wrap"
              gap="1rem"
              alignItems="center"
              text="Hide Password"
            >
              <input 
                type="checkbox"
                checked={hidePassword}
                onChange={toggleHidePassword}
              />
            </Label>
          </Grid>
          
        </Grid>
        
        <Button
          width="100%"
          type="submit"
          text="Login"
          bgColor={theme.color.one.value}
          color={theme.color.white}
          boxShadow={theme.boxShadow.secondary}
        />

        <p>
          Dont have an account?{' '}
          <Link href="/auth/sign-up">
            <a 
              style={{
                color: "blue"
              }}
            >Sign Up</a>
          </Link>
        </p>
        
      </Grid>
    </Grid>
  </Form>
  )
}