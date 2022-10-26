import React from 'react';

import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function GearHeader() {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <Button
        component={Link}
        disableElevation
        startIcon={<Add />}
        sx={{ borderRadius: 2 }}
        to="/gears/add"
        variant="contained"
      >
        機材を登録する
      </Button>
    </Box>
  );
}
