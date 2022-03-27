import styled from "styled-components"

const StyledTextArea = styled.textarea.attrs(({
  placeholder = null
}) => {
  return {
    placeholder
  }
})`
  width: ${({width}) => width ? width : 'auto'};
  border: ${({border}) => border ? border : '0'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  border-radius: 5px;
`

export const TextArea = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  width,
  border,
  bgColor
}) => {
  
  return <StyledTextArea
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    value={value}

    width={width}
    border={border}
    bgColor={bgColor}
  ></StyledTextArea>
}