import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { Box, Button, Collapse, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkgroups } from '../../../redux/actions/workgroups';
import { kickUser } from './EditGroupMembers.service';
import { useTranslation } from 'react-i18next';
import { FeatureContainer, HeaderText, HeaderWrapper } from './EditGroupMembers.styles';

export const EditGroupMembers = ({ openByDefault, ...props }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(openByDefault || false);
  const group = useSelector((state) => state.workgroups.data)?.find((group) => group._id == id);
  const user = useSelector((state) => state.auth.user);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: t('editGroupMembers.name'),
        width: 100
      },
      {
        field: 'email',
        headerName: 'E-mail',
        width: 150
      },
      {
        field: 'action',
        headerName: t('editGroupMembers.action'),
        sortable: false,
        renderCell: (params) => {
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach((c) => (thisRow[c.field] = params.row[c.field]));
          const isCurrentUser = thisRow._id === user._id;
          const onClick = (e) => {
            e.stopPropagation();
            kickUser(group._id, thisRow._id, user.token).then(() =>
              dispatch(getWorkgroups(user.token))
            );
          };
          return (
            <Button disabled={isCurrentUser} onClick={onClick}>
              {t('editGroupMembers.kickuser')}
            </Button>
          );
        }
      }
    ],
    [group]
  );

  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText>{t('editGroupMembers.editgroupmembers')}</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon/>}
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <Box sx={{ height: 300 }}>
          <DataGrid
            sx={{borderRadius: 4, marginTop: 1}}
            getRowId={(row) => row._id}
            rows={group?.members || []}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Collapse>
    </FeatureContainer>
  );
};
