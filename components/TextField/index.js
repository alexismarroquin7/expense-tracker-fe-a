import styled from "styled-components"

const StyledTextField = styled.input.attrs(({ 
  type = 'text',
  placeholder = null
}) => {
  return {
    type,
    placeholder
  }
})`
  
`

export const TextField = ({
  type,
  placeholder,
  onChange,
  name,
  value
}) => {
  return <StyledTextField
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    value={value}
  ></StyledTextField>
}