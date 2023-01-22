import { Box, Skeleton } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span className="loader"></span>
    </Box>
  );
};

export const ViewLoader = () => {
  return <Box mt={2} sx={{width: "100%", display: 'flex', flexDirection: "column" ,alignItems: 'center', gap: 2}}>
    <Box sx={{display: "flex", width: "100%", gap: 2}}>
      <Skeleton variant="rectangular" height={288} sx={{flex: 2, borderRadius: 3}} />
      <Skeleton variant="rectangular" sx={{flex: 1, height: "288px", borderRadius: 3}} />
    </Box>
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
    <Skeleton variant="rectangular" sx={{width: "100%", height: "48px", borderRadius: 3}} />
  </Box>
}