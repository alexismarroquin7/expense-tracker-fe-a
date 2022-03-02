import styled from "styled-components"

const StyledTextArea = styled.textarea.attrs(({
  placeholder = null
}) => {
  return {
    placeholder
  }
})`
  
`

export const TextArea = ({
  type,
  placeholder,
  onChange,
  name,
  value
}) => {
  return <StyledTextArea
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    name={name}
    value={value}
  ></StyledTextArea>
}