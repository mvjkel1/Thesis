import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [counter, setCounter] = useState(0);
  const [msInterval, setMsInterval] = useState(0);
  const [formValue, setFormValue] = useState(0);

  useEffect(() => {
    if (msInterval !== 0)
      setInterval(() => {
        setCounter((counter) => counter + 1);
      }, msInterval);
  }, [msInterval]);

  return (
    <>
      Counter: {counter}
      <br />
      Interval: {msInterval}
      <br />
      Set interval here:
      <TextField onChange={(e) => setFormValue(e.target.value)}></TextField>
      <Button onClick={() => setMsInterval(formValue)}>Set</Button>
    </>
  );
};

export default Chat;
