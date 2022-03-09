import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"
import { Button, Grid } from "../../components"
import { authAction } from "../../store";

export const NavBar = () => {
  const { loggedIn } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  
  const router = useRouter();

  const handleLogout = () => {
    dispatch(authAction.logout());
  }

  return (
  <nav>
    <Grid
      width="100%"
      direction="column wrap"
      alignItems="center"
    >

      <Grid
        width="90%"
        justify="space-between"
        padding="2rem 0"
      >
        <h6>My Expense Tracker</h6>

        <Grid
          border="1px solid red"
          gap="2rem"
        >

          {loggedIn ? (
            <Button
              text="Logout"
              onClick={handleLogout}
            />
          ) : (
            <>
            <Button
              text="Sign Up"
            />
            <Button
              text="Login"
              onClick={() => router.push(`/auth/login`)}
            />
            </>
          )}

        </Grid>
      </Grid>

    </Grid>
    
  </nav>
  )
}