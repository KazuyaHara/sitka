/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, BoxProps, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CreateSubmit } from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';

type Props = {
  gears: Gear[];
  loading: boolean;
  onSubmit: (data: CreateSubmit) => void;
  sx?: BoxProps['sx'];
};

const options = [
  { label: '写真', value: 'photo' },
  { label: '動画', value: 'movie' },
];

export default function GearForm({ gears, loading, onSubmit, sx }: Props) {
  const schema = yup.object().shape({
    maker: yup.string().required('メーカーを入力して下さい'),
    name: yup
      .string()
      .notOneOf(
        gears.map(({ name }) => name),
        'この機種名は既に登録されています'
      )
      .required('機種名を入力して下さい'),
    type: yup.string().required('種別を入力して下さい'),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateSubmit>({ mode: 'onBlur', resolver: yupResolver(schema) });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={gears.map((option) => option.maker)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('maker')}
                error={Boolean(errors.maker)}
                fullWidth
                helperText={errors.maker?.message}
                inputProps={{ ...params.inputProps, maxLength: 50 }}
                label="メーカー"
                name="maker"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('name')}
            error={Boolean(errors.name)}
            fullWidth
            helperText={errors.name?.message}
            inputProps={{ maxLength: 50 }}
            label="機種名"
            name="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('type')}
            error={Boolean(errors.type)}
            fullWidth
            helperText={errors.type?.message}
            label="種別"
            name="type"
            select
            SelectProps={{ native: true }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
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
          登録する
        </LoadingButton>
      </Box>
    </Box>
  );
}