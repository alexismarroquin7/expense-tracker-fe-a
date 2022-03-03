import styled from "styled-components"

const StyledLabel = styled.label`

  border: ${({border}) => border ? border : '0'};
  width: ${({width}) => width ? width : 'auto'};
  display: flex;
  
  flex-flow: ${({direction}) => direction ? direction : 'row wrap'};
  justify-content: ${({justify}) => justify ? justify : 'flex-start'};
  align-items: ${({alignItems}) => alignItems ? alignItems : 'flex-start'};
  gap: ${({gap}) => gap ? gap : '0'};

`

export const Label = (props) => {
  return (
  <StyledLabel
    border={props.border}
    width={props.width}
    direction={props.direction}
    justify={props.justify}
    alignItems={props.alignItems}
    gap={props.gap}
  >
    {props.text && <p>{props.text}</p>}
    {props.children}
  </StyledLabel>
  )
}