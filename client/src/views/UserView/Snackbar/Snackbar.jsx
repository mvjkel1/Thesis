import { Alert, Box, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function StatusSnackbar() {
  const workgroups = useSelector((state) => state.workgroups);
  const classes = useSelector((state) => state.classes);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (workgroups.error || classes.error) {
      setOpen(true);
      setAlertMessage(workgroups.error || classes.error);
    }
  }, [workgroups.error, classes.error]);
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="error">{alertMessage}</Alert>
    </Snackbar>
  );
}
