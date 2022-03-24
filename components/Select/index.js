import styled from "styled-components"

const StyledSelect = styled.div`

`

export const Select = (props) => {
  return (
    <StyledSelect
      style={{
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          gap: "1rem",
          border: "1px solid black",
          padding: ".5rem 1rem",
          borderRadius: "5px"
        }}
        onClick={() => {
          props.toggleOpen();
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",

            gap: "1rem",
            borderRadius: "20px"
          }}
        >
          {props.label ? <p>{props.label}</p> : ""}
          <p>V</p>
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
          }}
        >
          {props.value ? <p>{props.value}</p> : ""}
        </div>
      </div>

      {props.open && props.children}
    </StyledSelect>
  )
}