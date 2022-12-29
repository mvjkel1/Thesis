import { AppBar, styled } from '@mui/material';



export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.primary
}));
