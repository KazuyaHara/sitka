/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button, BoxProps, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ItemSubmit } from '../../../../../../interface/useCase/item';
import AspectRetioImage from '../../../atoms/aspectRatioImage';

type Form = Omit<ItemSubmit, 'files'>;
type Props = { loading: boolean; onSubmit: (data: ItemSubmit) => void; sx?: BoxProps['sx'] };

export default function ItemForm({ loading, onSubmit, sx }: Props) {
  const { handleSubmit } = useForm<Form>({ mode: 'onBlur' });
  const [files, setFiles] = useState<File[]>([]);

  const handleForm = (data: Form) => {
    if (files.length === 0) return;
    onSubmit({ ...data, files });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleForm)} sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button component="label" disabled={loading} variant="outlined">
            ファイルを選択する
            <input
              accept="image/*"
              hidden
              onChange={(event) =>
                setFiles(event.target.files ? Array.from(event.target.files) : [])
              }
              multiple
              type="file"
            />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={3}>
        {files.map((file) => (
          <Grid item key={file.name} xs={4} sm={3} md={2}>
            <AspectRetioImage borderRadius={1} src={URL.createObjectURL(file)} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="flex-end">
        <LoadingButton
          disableElevation
          loading={loading}
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          アップロードする
        </LoadingButton>
      </Box>
    </Box>
  );
}
