import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Box, Button, Collapse, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FeatureContainer, HeaderText, HeaderWrapper } from './EditGroupMembers.styles';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'name',
    width: 150,
    editable: true
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Kick (soon)</Button>;
    }
  }
];

export const EditGroupMembers = ({openByDefault, ...props}) => {
  const [open, setOpen] = useState(openByDefault || false);
  const { id } = useParams();
  const group = useSelector((state) => state.workgroups.data)?.find((group) => group._id == id);

  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText>Manage group members</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          <ArrowDropDownCircleIcon sx={{ alignSelf: 'center' }} />
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <Box sx={{ height: 300 }}>
          <DataGrid
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
