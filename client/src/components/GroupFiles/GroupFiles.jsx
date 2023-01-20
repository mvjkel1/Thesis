import { Box } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ViewClassFiles } from '../subcomponents/ViewClassFiles/ViewClassFiles';
import mime from 'mime';

const GroupFiles = ({ ...props }) => {
  const location = useLocation();
  const { extensions, name } = location?.state || {};
  const classFilesSelector = createSelector(
    (state) => state.classes?.data,
    (class_) => {
      const allFiles = class_?.map((class_) => class_.documents).flat();
      return extensions
        ? allFiles?.filter((file) => extensions.includes(mime.getExtension(file.mimetype)))
        : allFiles;
    }
  );
  const groupFiles = useSelector(classFilesSelector);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ViewClassFiles openByDefault files={groupFiles} name={name} />
    </Box>
  );
};

export default GroupFiles;
