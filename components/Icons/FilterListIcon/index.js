import styled from "styled-components"

const StyledFilterListIcon = styled.div`

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: .5rem;
  padding: .5rem;
  border: .2rem solid black;
  border-radius: 5px;

  .FilterListIcon__Lines__Container {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: .5rem;
  }
  
  .FilterListIcon__Line {
    background-color: ${({bgColor}) => bgColor ? bgColor : 'black'};
  }
  
  .FilterListIcon__Line__A {
    padding: .15rem 1.75rem;
  }
  
  .FilterListIcon__Line__B {
    padding: .15rem 1rem;
  }
  
  .FilterListIcon__Line__C {
    padding: .15rem .5rem;
  }

`;

export const FilterListIcon = (props) => {
  return (
  <StyledFilterListIcon
    {...props}
  >
    
    {props.text && <span>{props.text}</span>}

    <div
      className="FilterListIcon__Lines__Container"
    >
      <div
        className="FilterListIcon__Line FilterListIcon__Line__A"
      ></div>
      
      <div
        className="FilterListIcon__Line FilterListIcon__Line__B"
      ></div>
      
      <div
        className="FilterListIcon__Line FilterListIcon__Line__C"
      ></div>
    </div>

  </StyledFilterListIcon>
  )
}