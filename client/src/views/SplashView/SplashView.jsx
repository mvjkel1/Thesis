import { Box, Grid, Typography } from "@mui/material";
import AuthContainer from "./AuthContainer";
import ScreenShareIcon from '@mui/icons-material/ScreenShare';


const SplashView = () => {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            backgroundColor: "rgba(244,246,248,255)",
        }}>
            <Grid container sx={{minHeight: "100vh"}}>
                <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}}>
                    <ScreenShareIcon color="primary"/>
                    <Typography fontSize="1.5rem" fontWeight={700}>&nbsp;StudentShare</Typography>
                </Grid>
                <Grid item xs={12} sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <AuthContainer/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SplashView;