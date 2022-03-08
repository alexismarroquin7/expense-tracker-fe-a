import { useTheme } from "styled-components";
import { Section } from "../../components";
import { LoginForm } from "../../widgets";

export default function Login(){
  const theme = useTheme();
  return (
  <Section
    width="100%"
    height="100vh"
    bgColor={theme.color.one.value}
  >
    <LoginForm/>
  </Section>
  )
}