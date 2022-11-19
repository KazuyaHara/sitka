import React from 'react';

import {
  ArrowBack,
  ChevronLeft,
  ChevronRight,
  CloudDownload,
  DeleteForever,
} from '@mui/icons-material';
import { AppBar, Box, Button, CircularProgress, Dialog, IconButton, Toolbar } from '@mui/material';

import { ItemWithURL } from '../../../../../domains/item';

type Props = {
  item: ItemWithURL;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDownload: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
};

export default function Lightbox({
  item,
  loading,
  onClose,
  onDelete,
  onDownload,
  onNavigateNext,
  onNavigatePrev,
}: Props) {
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      onClose={onClose}
      open
      PaperProps={{ sx: { bgcolor: 'black', height: '100%' } }}
    >
      <Box alignItems="center" bgcolor="black" display="flex" height="100%" justifyContent="center">
        <AppBar color="transparent" elevation={0} position="absolute">
          <Toolbar>
            <Box flexGrow={1}>
              <Button
                onClick={onClose}
                size="large"
                startIcon={<ArrowBack />}
                sx={{ color: 'white' }}
              >
                戻る
              </Button>
            </Box>
            <Box>
              <IconButton onClick={onDownload} sx={{ color: 'white' }}>
                {loading ? <CircularProgress color="inherit" size={20} /> : <CloudDownload />}
              </IconButton>
              <IconButton disabled={loading} onClick={onDelete} sx={{ color: 'white' }}>
                <DeleteForever />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          alignItems="center"
          display="flex"
          height="100%"
          justifyContent="space-between"
          px={3}
          width="100%"
        >
          <IconButton
            disabled={loading || !onNavigateNext}
            onClick={onNavigateNext}
            sx={{ color: 'white' }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          <Box component="img" maxHeight="100%" src={item.url} />
          <IconButton
            disabled={loading || !onNavigatePrev}
            onClick={onNavigatePrev}
            sx={{ color: 'white' }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );
}
