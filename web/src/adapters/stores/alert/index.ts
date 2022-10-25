import { AlertProps, SnackbarProps } from '@mui/material';
import create from 'zustand';

export type AlertState = Pick<AlertProps, 'severity'> &
  Pick<SnackbarProps, 'open'> & { message: string };

export const useAlertStore = create<AlertState>(() => ({ message: '' }));
