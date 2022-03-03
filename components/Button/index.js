import styled from "styled-components"

const StyledButton = styled.button``

export const Button = ({
  text = null,
  onClick = () => {}
}) => {
  return (
  <StyledButton
    onClick={onClick}
  >
    {text}
  </StyledButton>
  )
}