import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = { onClose: () => void; onSubmit: () => void; open: boolean };

export default function AlbumDeleteDialog({ onClose, onSubmit, open }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h2">このアルバムを削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText variant="body1">
          この操作は元に戻すことができません。本当によろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセルする</Button>
        <Button color="error" onClick={onSubmit}>
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
