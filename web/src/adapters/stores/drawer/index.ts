import { DrawerProps } from '@mui/material';
import create from 'zustand';

export type DrawerState = Pick<DrawerProps, 'open'>;

export const useDrawerStore = create<DrawerState>(() => ({ open: false }));
