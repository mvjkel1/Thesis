import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { EditGroupData } from '../components/EditGroupData/EditGroupData';
import { EditGroupMembers } from '../components/EditGroupMembers/EditGroupMembers';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useSelector } from 'react-redux';
import { HeaderText } from './GroupAdmin.styles';
import AddClass from '../components/AddClass/AddClass';

export const GroupAdmin = () => {
  const { id } = useParams();
  const group = useSelector((state) => state.workgroups.data)?.find((group) => group._id == id);
  const navigate = useNavigate();
  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <IconButton onClick={() => navigate('/manage-groups')}>
            <ArrowCircleLeftIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <HeaderText ml={1}>Edit group &nbsp;</HeaderText>
          <HeaderText sx={{ fontWeight: '400 !important' }}>{group?.name}</HeaderText>
        </Box>
      </Box>
      <EditGroupData />
      <AddClass />
      <EditGroupMembers />
    </Box>
  );
};
