import styled from "styled-components"

const StyledButton = styled.button``

export const Button = ({
  text = null
}) => {
  return (
  <StyledButton>
    {text}
  </StyledButton>
  )
}