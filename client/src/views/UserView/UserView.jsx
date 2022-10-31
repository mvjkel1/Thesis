import { Grid } from "@mui/material";
import ResponsiveAppBar from "./Appbar";
import Main from "./Main";
import { Rightbar } from "./Rightbar";
import Sidebar from "./Sidebar";

const UserView = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <ResponsiveAppBar />
      </Grid>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={6}>
        <Main />
      </Grid>
      <Grid item xs={3}>
        <Rightbar />
      </Grid>
    </Grid>
  );
};

export default UserView;
