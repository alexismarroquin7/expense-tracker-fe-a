import styled from "styled-components"

const StyledButton = styled.button`
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  color: ${({color}) => color ? color : 'auto'};
`;

export const Button = ({
  text = null,
  onClick = () => {},
  bgColor,
  color
}) => {
  return (
  <StyledButton
    onClick={onClick}
    bgColor={bgColor}
    color={color}
  >
    <p>{text}</p>
  </StyledButton>
  )
}