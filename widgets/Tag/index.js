import { Grid } from "../../components"

export const Tag = ({tag}) => {
  return (
  <Grid>
    <p
      style={{
        color: "blue"
      }}
    >#</p>
    <p
      style={{
        color: "blue",
        textDecoration: "underline"
      }}
    >{tag.text}</p>
  </Grid>
  )
}