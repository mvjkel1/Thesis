import { Box } from "@mui/material"

export const Loader = () => {
    return (
        <Box sx={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className="loader"></span>
        </Box>
    )
}