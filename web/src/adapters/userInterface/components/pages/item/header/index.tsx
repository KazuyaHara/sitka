import React from 'react';

import { CloudUpload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ItemHeader() {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <Button
        component={Link}
        disableElevation
        startIcon={<CloudUpload />}
        sx={{ borderRadius: 2 }}
        to="/media/add"
        variant="contained"
      >
        メディアをアップロードする
      </Button>
    </Box>
  );
}
