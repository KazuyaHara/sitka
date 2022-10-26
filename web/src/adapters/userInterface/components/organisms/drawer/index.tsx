import React from 'react';

import { CameraAlt, Photo } from '@mui/icons-material';
import {
  Box,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { DrawerState } from '../../../../stores/drawer';

type Props = DrawerState & { onClose: () => void };

export const DrawerContent = () => {
  const { pathname } = useLocation();
  const { palette } = useTheme();

  const items = [
    { icon: <Photo sx={{ color: palette.text.primary }} />, primary: 'メディア', to: '/media' },
    { icon: <CameraAlt sx={{ color: palette.text.primary }} />, primary: '機材', to: '/gears' },
  ];

  return (
    <List disablePadding sx={{ flexGrow: 1 }}>
      {items.map((item) => (
        <ListItem disableGutters key={item.primary} sx={{ py: 0.25 }}>
          <ListItemButton
            component={Link}
            sx={{
              backgroundColor: pathname.startsWith(item.to) ? palette.grey['200'] : 'transparent',
              borderRadius: 2,
            }}
            to={item.to}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.primary} primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default function Drawer({ onClose, open }: Props) {
  return (
    <MUIDrawer onClose={onClose} open={open}>
      <Box p={3} minWidth={250}>
        <DrawerContent />
      </Box>
    </MUIDrawer>
  );
}
