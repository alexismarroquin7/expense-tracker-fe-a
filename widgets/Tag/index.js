import { Grid } from "../../components"

export const Tag = ({tag}) => {
  return (
  <Grid>
    <p
      style={{
        color: "blue"
      }}
    >#{tag.text}</p>
  </Grid>
  )
}