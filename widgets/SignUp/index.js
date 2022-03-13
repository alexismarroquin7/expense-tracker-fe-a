import { useForm, useToggle } from "../../hooks";


import { Form, Grid, TextField, Button, Label } from "../../components";
import Link from "next/link"
import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const initialFormValues = {
  email: '',
  password: '',
  confirm_password: ''
}

const initialHelperText = {
  token: '',
  message: ''
}

export const SignUpForm = ({steps, setSteps}) => {
  
  const dispatch = useDispatch();
  const auth = useSelector(s=>s.auth);

  const [helperText, setHelperText] = useState(initialHelperText);
  
  const { active: hidePassword, toggle: toggleHidePassword } = useToggle(true);
  
  const { active: passwordsMatch, setActive: setPasswordsMatch } = useToggle(false);

  const {
    values: credentials,
    setValues: setCredentials,
    clear
  } = useForm(initialFormValues);
  
  const handleChange = (e) => {
    const {name, value, type} = e.target;
    
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  useEffect(() => {
    dispatch(authAction.resetRequestSignUp());
  }, [])

  useEffect(() => {
    if(
      credentials.password.length > 0 &&
      credentials.confirm_password.length > 0 &&
      credentials.password.length === credentials.confirm_password.length
    ){
      if(credentials.password === credentials.confirm_password){
        setPasswordsMatch(true);
      }
    } else {
      setPasswordsMatch(false);
    }
  }, [setPasswordsMatch, credentials])

  const handleResendConfirmationEmail = () => {
    setHelperText({...initialHelperText, token: ''});
    setSteps(steps.map(step => {
      if(step.count === 2){
        step.selected = false;
        step.complete = false;
      } else {
        step.selected = true;
        step.complete = false;
      }
      return step;
    }))
    router.push('/auth/sign-up');
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(steps[0].selected){
      dispatch(authAction.requestSignUp({
        email: credentials.email.trim()
      }));
    } else if(steps[1].selected){
      if(credentials.email &&
        credentials.password &&
        passwordsMatch
      ) {
        dispatch(authAction.signUp({...credentials, token: router.query.token}));
      }
    }
    clear();
  }
  
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if(router.query.token){
      try {
        const decodedToken = jwtDecode(router.query.token);
        setCredentials(c => {
          return {
            ...c,
            email: decodedToken.subject
          } 
        });
        setHelperText(h => {
          return {
            ...h,
            token: initialHelperText.token
          }
        })
      } catch (err) {
        setCredentials(c => {
          return {
            ...c,
            email: initialFormValues.email
          } 
        });
        setHelperText(h => {
          return {
            ...h,
            token: 'invalid token'
          }
        })
      }
    } else if(!router.query.token && steps[1].selected){
      setCredentials(c => {
        return {
          ...c,
          email: initialFormValues.email
        } 
      });
      setHelperText(h => {
        return {
          ...h,
          token: 'invalid token'
        }
      })
    }
  }, [setCredentials, router.query.token, steps]);

  useEffect(() => {
    if(!auth.requestedSignUp && auth.status.error.message){
      setHelperText(s => {
        return {...s, message: auth.status.error.message}
      })
    }
  }, [auth.requestedSignUp, auth.status.error.message, setHelperText])

  useEffect(() => {
    if(auth.loggedIn){
      router.push(`/transactions`);
    }
  }, [router, auth.loggedIn])

  return (
  <Form
    width="90%"
    borderRadius={theme.borderRadius.primary}
    bgColor={theme.color.white}
    onSubmit={handleSubmit}
    padding="2rem"
  >
    <Grid
      direction="column wrap"
      alignItems="center"
    >
      <Grid
        width="100%"
        direction="column wrap"
        alignItems="center"
        gap="4rem"

      >
        <Grid
        >
          <h5>Sign Up</h5>
        </Grid>

        {steps[0].selected && (
          <Grid
            direction="column wrap"
            alignItems="center"
          >
            <p>Enter your email address to recieve a confirmation link.</p>
          </Grid>
        )}

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
              autoComplete="off"
              width="100%"
            />
          </Label>
          
          {steps[1].selected && (
            <Grid
              direction="column wrap"
              alignItems="center"
              gap="2rem"
              width="100%"
            >
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
                  autoComplete="off"
                  width="100%"
                />
              </Label>
              
              <Label
                width="100%"
                text="Confirm Password:"
                gap="1rem"
              >
                <TextField
                  type={hidePassword ? "password" : "text"}
                  name="confirm_password"
                  value={credentials.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  autoComplete="off"
                  width="100%"
                />
              </Label>

              <Grid
                width="100%"
                direction="column wrap"
                gap="1rem"
              >
                <Label
                  width="100%"
                  direction="row-reverse wrap"
                  alignItems="center"
                  justify="flex-end"
                  text="Hide Password"
                  gap="1rem"
                >
                  <input 
                    type="checkbox"
                    checked={hidePassword}
                    onChange={toggleHidePassword}
                  />
                  
                </Label>

                <p>Passwords Match: <span style={{color: passwordsMatch ? 'green' : 'red'}}>{passwordsMatch ? 'yes' : 'no'}</span></p>
              </Grid>

            </Grid>
          )}

        </Grid>
        
        <Button
          type="submit"
          text={steps[0].selected ? "Sign Up" : "Complete Sign Up"}
          width="100%"
          disabled={(helperText.token.length > 0 && steps[1].selected) ? true : false}
        />

        {steps[0].selected && helperText.message && (
          <Grid
            direction="column wrap"
            alignItems="center"
            gap="1rem"
          >
            <p style={{color: 'red'}}>{helperText.message}</p>
          </Grid>
        )}
        
        {steps[0].selected && auth.requestedSignUp && auth.status.error.message.length === 0 && (
          <Grid
            direction="column wrap"
            alignItems="center"
            gap="1rem"
          >
            <p style={{color: 'blue'}}>{"Confirmation email sent!"}</p>
          </Grid>
        )}

        {steps[1].selected && helperText.token && (
          <Grid
            direction="column wrap"
            alignItems="center"
            gap="1rem"
          >
            <p style={{color: 'red'}}>{helperText.token}</p>

            <p 
              style={{
                color:'blue',
                textDecoration: 'underline'
              }}
              onClick={handleResendConfirmationEmail}
            
            >Re-send confirmation email</p>
                        
          </Grid>
        )}
 
        {steps[1].selected && auth.status.error.message && (
          <Grid
            direction="column wrap"
            alignItems="center"
            gap="1rem"
          >
            <p style={{color: 'red'}}>{auth.status.error.message}</p>

            <p 
              style={{
                color:'blue',
                textDecoration: 'underline'
              }}
              onClick={handleResendConfirmationEmail}
            
            >Re-send confirmation email</p>
                        
          </Grid>
        )}

        <p>Already have an account?{' '}
          <Link 
            href="/auth/login"
          >
            <a 
              style={{
                color:'blue'
              }}
            >Login</a>
          </Link>
        </p>
        
      </Grid>
    </Grid>
  </Form>
  )

}