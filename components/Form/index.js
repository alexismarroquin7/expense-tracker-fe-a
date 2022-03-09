import styled from "styled-components"

const StyledForm = styled.form`
  border: ${({border}) => border ? border : '0'};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '0'};
  padding: ${({padding}) => padding ? padding : '0'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : '0'};
`

export const Form = (props) => {
  return (
  <StyledForm
    {...props}
    onSubmit={props.onSubmit ? props.onSubmit : (e) => {e.preventDefault()}}
  >
    {props.children}
  </StyledForm>
  )
}