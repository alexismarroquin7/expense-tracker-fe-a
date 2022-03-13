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
  padding: ${({padding}) => padding ? padding : '1rem'};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '5px'};
  border: ${({border}) => border ? border : '0'};
  background-color: ${({bgColor, theme}) => bgColor ? bgColor : theme.color.four.value};
  box-shadow: ${({boxShadow}) => boxShadow ? boxShadow : '0'};
  
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({color}) => color ? color : 'grey'};
  }
  :-ms-input-placeholder {
    color: ${({color}) => color ? color : 'grey'};
  }
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
  width,
  borderRadius,
  border,
  bgColor,
  boxShadow
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
    borderRadius={borderRadius}
    border={border}
    bgColor={bgColor}
    boxShadow={boxShadow}
  ></StyledTextField>
}