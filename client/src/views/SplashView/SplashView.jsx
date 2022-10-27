import { Box } from "@mui/material";
import Auth from "./Form"
import Auth2 from "./AuthContainer";


const SplashView = () => {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#6d6f6e",
            minHeight: "100%"
        }}>
            <Auth2/>
        </Box>
    )
}

export default SplashView;