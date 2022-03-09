import { useTheme } from "styled-components";
import { Section } from "../../components";
import { SignUpForm } from "../../widgets";

export default function SignUp () {
  const theme = useTheme();
  return (
  <Section
    width="100%"
    height="100vh"
    bgColor={theme.color.one.value}
  >
    <SignUpForm/>
  </Section>
  )
}