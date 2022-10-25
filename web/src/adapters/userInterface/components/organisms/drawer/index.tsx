import React from 'react';

import { Box, Drawer as MUIDrawer } from '@mui/material';

import { DrawerState } from '../../../../stores/drawer';

type Props = DrawerState & { onClose: () => void };

export const DrawerContent = () => <Box>sidebar</Box>;

export default function Drawer({ onClose, open }: Props) {
  return (
    <MUIDrawer onClose={onClose} open={open}>
      <Box p={3}>
        <DrawerContent />
      </Box>
    </MUIDrawer>
  );
}
