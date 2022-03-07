import styled from "styled-components"

const StyledSearchIcon = styled.div`
  border: ${({border}) => border ? border : '0'};
  width: ${({width}) => width ? width : 'auto'};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  
  .search_icon__circle {
    border: .3rem solid black;
    border-radius: 100%;
    padding: .75rem;
  }

  .search_icon__stem {
    border: .2rem solid black;
    background-color: black;
    width: 1rem;
    transform-origin: top right;
    transform: rotate(45deg) translate(.7rem, -.3rem);
  }

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
    ></button>
    <div
      className="search_icon__circle"
      ></div>
    <div
      className="search_icon__stem"
    ></div>
  </StyledSearchIcon>
  )
}