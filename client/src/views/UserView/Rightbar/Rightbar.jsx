import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { TitleWrapper, UserEntryContainer } from "./Rightbar.styles";

const users = ["Bogus", "Michal", "Kasia", "Basia", "Asia", "Stasia"];

export const UserEntry = ({ username }) => {
  return (
    <UserEntryContainer>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography color="text.primary" ml={1}>{username}</Typography>
      </Box>
    </UserEntryContainer>
  );
};

export const Rightbar = () => {
  return (
    <Stack mt={2} sx={{ width: "23%", position: "fixed" }}>
      <Box sx={{ position: "inherit", width: "inherit" }}>
        <TitleWrapper color="text.primary">Workgroup users</TitleWrapper>
        {users.map((user) => (
          <UserEntry username={user} />
        ))}
      </Box>
    </Stack>
  );
};
