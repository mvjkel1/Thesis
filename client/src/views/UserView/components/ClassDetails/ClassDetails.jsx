import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewClassFiles } from '../components/ViewClassFiles/ViewClassFiles';
import { Uploader } from './Uploader';

export const ClassDetails = () => {
  const { id } = useParams();
  const classFiles = useSelector((state) => {
    return state.classes?.data?.find((classEntry) => classEntry._id == id);
  })?.documents;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>Class {id}</Box>
      <Box>
        <ViewClassFiles files={classFiles} />
      </Box>
      <Box key={id}>
        <Uploader />
      </Box>
    </Box>
  );
};
