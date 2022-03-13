import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Section, Grid, Border } from "../../components";
import { SignUpForm } from "../../widgets";
import { v4 as uuidv4 } from "uuid";

const initialSteps = [
  {
    key: uuidv4(),
    count: 1,
    selected: true,
    complete: false
  },
  {
    key: uuidv4(),
    count: 2,
    selected: false,
    complete: false
  }
]

export default function SignUp () {
  const theme = useTheme();
  const router = useRouter();
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    if(router.query.token){
      setSteps(s =>
        [
          ...s.map(step => {
            if(step.count === 2){
              step.selected = true;
            } else {
              step.selected = false;
              step.complete = true;
            }
            return step;
          })
        ]
      );
    }
  }, [router.query.token]);

  return (
  <Section
    width="100%"
    height="100vh"
    bgColor={theme.color.one.value}
  >
    <Grid
      width="100%"
      direction="column wrap"
      alignItems="center"
      gap="2rem"
    >
      <Grid
        gap="2rem"
      >
        {steps.map((step) => (
          <Grid
            key={step.key}
            padding="1rem"
            direction="column wrap"
            alignItems="center"
            borderRadius={theme.borderRadius.primary}
            gap="1rem"
          >
            <h6>{step.count}</h6>
            {step.selected ? <Border width="3rem" borderRadius={theme.borderRadius.primary} /> : ''}
          </Grid>
        ))}
      </Grid>
      
      <SignUpForm
        steps={steps}
        setSteps={setSteps}
      />
    
    </Grid>
  </Section>
  )
}