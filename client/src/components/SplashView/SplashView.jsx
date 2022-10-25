import { Box } from "@mui/material";
import Auth from "./Auth"


const SplashView = () => {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#eaecf9",
            minHeight: "100%"
        }}>
            <Auth/>
        </Box>
    )
}

export default SplashView;