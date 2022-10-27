import { Box, Stack, Typography } from "@mui/material"
import { Outlet } from "react-router-dom";

const Main = () => {

    return (
        <Stack direction="column" spacing={4} alignItems="center">
            <Box sx={{width: "100%", height: "100%"}}>
                <Outlet/>
            </Box>
            <Box>
                <Typography>Some message</Typography>
            </Box>
        </Stack>
    )
}

export default Main;