/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Grid, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Album } from '../../../../../../domains/album';
import { AlbumSubmit } from '../../../../../../interface/useCase/album';

type Form = Omit<AlbumSubmit, 'date'> & { date: Date | null };
type Props = {
  data?: Album;
  loading: boolean;
  onSubmit: (data: AlbumSubmit) => void;
  options: Album[];
  sx?: BoxProps['sx'];
};

export default function AlbumForm({ data, loading, onSubmit, options, sx }: Props) {
  const schema = yup.object().shape({
    date: yup.date().required('日付を入力して下さい'),
    name: yup
      .string()
      .notOneOf(
        options.filter(({ name }) => name !== data?.name).map(({ name }) => name),
        'この名前は既に登録されています'
      )
      .required('名前を入力して下さい'),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Form>({
    defaultValues: { date: data?.date ?? new Date(), name: data?.name ?? '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const date = watch('date');

  const handleForm = (form: Form) => {
    if (!date) return;
    onSubmit({ ...form, date });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleForm)} sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('name')}
            error={Boolean(errors.name)}
            fullWidth
            helperText={errors.name?.message}
            inputProps={{ maxLength: 100 }}
            label="名前"
            name="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DesktopDatePicker
                {...field}
                inputFormat="yyyy年MM月dd日"
                label="日付"
                onChange={(value) => setValue('date', value)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            )}
          />
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
          作成する
        </LoadingButton>
      </Box>
    </Box>
  );
}
