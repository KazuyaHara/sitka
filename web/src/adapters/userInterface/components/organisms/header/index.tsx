import * as React from 'react';

import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';

import Logo from '../../../assets/logo/black.png';

type Props = { handleSignOut: () => void };

export default function Header({ handleSignOut }: Props) {
  return (
    <AppBar color="secondary" position="static" sx={{ boxShadow: '0 0 64px 0 rgba(0, 0, 0, .15)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label="account of current user"
            // onClick={handleOpenNavMenu}
            color="primary"
            size="large"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Box component="img" height={24} src={Logo} />
          <Box flexGrow={1} />
          <Button onClick={handleSignOut}>ログアウト</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
