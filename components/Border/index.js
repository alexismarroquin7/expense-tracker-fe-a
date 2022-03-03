import styled from "styled-components"

const StyledBorder = styled.div`
  width: ${({width}) => width ? width : '100%'};
  padding: ${({padding}) => padding ? padding : '.2rem'};
  background-color: ${({bgColor, theme}) => bgColor ? bgColor : theme.color.white};
`;

export const Border = (props) => {
  return (
  <StyledBorder
    width={props.width}
    padding={props.padding}
    bgColor={props.bgColor}
  ></StyledBorder>
  )
}