import styled from "styled-components"

const StyledDateInput = styled.input.attrs(({ 
  type = "date",
  placeholder = null
}) => {
  return {
    type,
    placeholder
  }
})`
  
`

export const DateInput = ({
  placeholder,
  onChange,
  name,
  value
}) => {
  return <StyledDateInput
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    value={value}
  ></StyledDateInput>
}