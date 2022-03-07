import styled from "styled-components"

const StyledTextField = styled.input.attrs(({ 
  type = 'text',
  placeholder = null,
  value,
  autoComplete
}) => {
  return {
    type,
    placeholder,
    value,
    autoComplete
  }
})`
  width: ${({width}) => width ? width : 'auto'};
  padding: ${({padding}) => padding ? padding : '0'};
`

export const TextField = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  onFocus,
  onBlur,
  autoComplete,
  padding,
  width
}) => {
  return <StyledTextField
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    name={name}
    value={value}
    autoComplete={autoComplete}
    padding={padding}
    width={width}
  ></StyledTextField>
}