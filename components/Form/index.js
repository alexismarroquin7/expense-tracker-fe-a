import styled from "styled-components"

const StyledForm = styled.form`
  border: ${({border}) => border ? border : '0'};
`

export const Form = (props) => {
  return (
  <StyledForm
    border={props.border}
  >
    {props.children}
  </StyledForm>
  )
}