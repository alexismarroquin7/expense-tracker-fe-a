import styled from "styled-components"

const StyledBorder = styled.div`
  width: ${({width}) => width ? width : '100%'};
  padding: ${({padding}) => padding ? padding : '.2rem'};
  background-color: ${({bgColor, theme}) => bgColor ? bgColor : theme.color.white};
  transition: ${({transition}) => transition ? transition : 'none'};
`;

export const Border = (props) => {
  return (
  <StyledBorder
    {...props}
  ></StyledBorder>
  )
}