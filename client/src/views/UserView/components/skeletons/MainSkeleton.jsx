import { Box, Skeleton, Stack } from "@mui/material";

const MainSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
    </Box>
  );
};

export default MainSkeleton;
