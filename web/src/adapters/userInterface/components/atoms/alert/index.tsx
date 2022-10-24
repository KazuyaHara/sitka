import React from 'react';

import { Alert as MUIAlert, AlertProps as MUIAlertProps, Snackbar } from '@mui/material';

export type AlertProps = {
  onClose: () => void;
  options?: Pick<MUIAlertProps, 'severity'> & { message: string };
};

export default function Alert({ onClose, options }: AlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={5000}
      onClose={onClose}
      open={Boolean(options)}
    >
      <MUIAlert
        onClose={onClose}
        severity={options?.severity || 'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {options?.message}
      </MUIAlert>
    </Snackbar>
  );
}
