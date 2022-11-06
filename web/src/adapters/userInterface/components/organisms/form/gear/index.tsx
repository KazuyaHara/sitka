/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, BoxProps, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Gear } from '../../../../../../domains/gear';
import { GearSubmit } from '../../../../../../interface/useCase/gear';

type Props = {
  data?: Gear;
  loading: boolean;
  onSubmit: (data: GearSubmit) => void;
  options: Gear[];
  sx?: BoxProps['sx'];
};

const types = [
  { label: '写真', value: 'photo' },
  { label: '動画', value: 'movie' },
];

export default function GearForm({ data, loading, onSubmit, options, sx }: Props) {
  const schema = yup.object().shape({
    maker: yup.string().required('メーカーを入力して下さい'),
    name: yup
      .string()
      .notOneOf(
        options.filter(({ name }) => name !== data?.name).map(({ name }) => name),
        'この機種名は既に登録されています'
      )
      .required('機種名を入力して下さい'),
    type: yup.string().required('種別を入力して下さい'),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<GearSubmit>({
    defaultValues: {
      maker: data?.maker ?? '',
      name: data?.name ?? '',
      type: data?.type ?? 'photo',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sx}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={options
              .map((option) => option.maker)
              .filter((maker): maker is NonNullable<typeof maker> => maker != null)
              .filter((maker, index, self) => self.indexOf(maker) === index)}
            renderInput={(params) => {
              const { value, ...inputProps } = params.inputProps; // eslint-disable-line @typescript-eslint/no-unused-vars
              return (
                <TextField
                  {...params}
                  {...register('maker')}
                  error={Boolean(errors.maker)}
                  fullWidth
                  helperText={errors.maker?.message}
                  inputProps={{ ...inputProps, maxLength: 50 }}
                  label="メーカー"
                  name="maker"
                />
              );
            }}
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
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
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
