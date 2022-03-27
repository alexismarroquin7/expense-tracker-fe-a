import styled from "styled-components"

const StyledSelect = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};

  .StyledSelect__container {
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    border: 1px solid black;
    padding: .5rem 1rem;
    border-radius: 5px;
  }

  .StyledSelect__label__container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    gap: 1rem;
    border-radius: 20px;
  }

  .StyledSelect__value__container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
`

export const Select = (props) => {
  return (
    <StyledSelect
      {...props}
    >
      <div
        className="StyledSelect__container"
        onClick={() => {
          props.toggleOpen();
        }}
      >
        <div
          className="StyledSelect__label__container"
        >
          {props.label ? <p>{props.label}</p> : ""}
          <p>V</p>
        </div>

        <div
          className="StyledSelect__value__container"
        >
          {props.value ? <p>{props.value}</p> : ""}
        </div>
      </div>

      {props.open && props.children}
    </StyledSelect>
  )
}