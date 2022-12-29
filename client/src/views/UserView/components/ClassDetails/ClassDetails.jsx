import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddEvent from '../components/AddEvent/AddEvent';
import { UploadClassFiles } from '../components/UploadClassFiles/UploadClassFiles';
import { ViewClassFiles } from '../components/ViewClassFiles/ViewClassFiles';

export const ClassDetails = () => {
  const { id } = useParams();
  const groupId = useSelector((state) => state.workgroups.currentWorkgroup)?._id;
  const classFiles = useSelector((state) => {
    return state.classes?.data?.find((classEntry) => classEntry._id == id);
  })?.documents;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <ViewClassFiles openByDefault files={classFiles} />
      </Box>
      <Box key={id}>
        <UploadClassFiles />
      </Box>
      <Box>
        <AddEvent classId={id} groupId={groupId} openByDefault />
      </Box>
    </Box>
  );
};
