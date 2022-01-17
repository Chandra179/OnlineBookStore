import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  if (props.loginALert) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{props.loginALert}</Alert>
      </Stack>
    );
  } else if (props.signupAlert) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{props.signupAlert}</Alert>
      </Stack>
    );
  } else {
    return (
      <></>
    );
  }
}