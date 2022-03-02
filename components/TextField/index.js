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
  
`

export const TextField = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  onFocus,
  onBlur,
  autoComplete
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
  ></StyledTextField>
}