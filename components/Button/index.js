import styled from "styled-components"

const StyledButton = styled.button`
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  color: ${({color}) => color ? color : 'auto'};
  width: ${({width}) => width ? width : 'auto'};
  padding: ${({padding}) => padding ? padding : '1rem'};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '5px'};
  border: ${({border}) => border ? border : '0'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : 'auto'};
`;

export const Button = (props) => {
  return (
  <StyledButton
    onClick={props.onClick ? props.onClick : () => {}}
    {...props}
  >
    {props.text ? <p>{props.text}</p> : ''}
  </StyledButton>
  )
}