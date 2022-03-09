import styled from "styled-components"
import Image from "next/image";
const StyledSearchIcon = styled.div`
  border: ${({border}) => border ? border : '0'};
  width: ${({width}) => width ? width : 'auto'};
  height: ${({height}) => height ? height : 'auto'};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 0;

  background-color: ${({bgColor, theme}) => bgColor ? bgColor : theme.color.four.value};
  border-radius: 5px;

  button {
    opacity: 0;
    display: hidden;
  }
`

export const SearchIcon = ({
  width,
  border,
  onClick,
  type
}) => {
  return (
  <StyledSearchIcon
    onClick={onClick ? onClick : () => {}}
    width={width}
    border={border}
  >
    <button
      type={type ? type : "submit"}
    >
    </button>
    <Image 
      src="https://img.icons8.com/ios/24/000000/search--v1.png"
      alt="search icon"
      width="20px"
      height="20px"
    />
  </StyledSearchIcon>
  )
}