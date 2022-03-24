export const MenuItem = (props) => {
  return (
    <p
      style={{
        width: "100%",
        border: "1px solid black",
        padding: ".5rem 1rem",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center"
      }}
      onClick={() => {
        if(props.onClick){
          props.onClick()
        }
        props.toggleOpen()
      }}
    >
      {props.children}
    </p>
  );
};
