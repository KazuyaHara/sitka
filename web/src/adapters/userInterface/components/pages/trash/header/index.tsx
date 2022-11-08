import React from 'react';

import { Restore } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

type Props = { loading: boolean; onSubmit: () => void; selectedItemIds: string[] };

export default function TrashHeader({ loading, onSubmit, selectedItemIds }: Props) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <LoadingButton
        disabled={selectedItemIds.length === 0}
        disableElevation
        loading={loading}
        onClick={onSubmit}
        startIcon={<Restore />}
        sx={{ borderRadius: 2 }}
        variant="contained"
      >
        選択したメディアを復元する
      </LoadingButton>
    </Box>
  );
}
