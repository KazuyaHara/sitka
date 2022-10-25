import React from 'react';

import { Alert as MUIAlert, Snackbar } from '@mui/material';

import { AlertState } from '../../../../stores/alert';

export type AlertProps = AlertState & { onClose: () => void };

export default function Alert({ onClose, message, open, severity }: AlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={5000}
      onClose={onClose}
      open={open}
    >
      <MUIAlert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </MUIAlert>
    </Snackbar>
  );
}
