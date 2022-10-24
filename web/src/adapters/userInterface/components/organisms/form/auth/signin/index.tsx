/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, BoxProps, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type Submit = { email: string; password: string };
type Props = { loading: boolean; onSubmit: (data: Submit) => void; sx?: BoxProps['sx'] };

const schema = yup.object().shape({
  email: yup.string().email('入力内容を確認して下さい').required('メールアドレスを入力して下さい'),
  password: yup.string().min(6, '入力内容を確認して下さい').required('パスワードを入力して下さい'),
});

export default function SignIn({ loading, onSubmit, sx }: Props) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Submit>({ mode: 'onBlur', resolver: yupResolver(schema) });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={sx}>
      <Stack spacing={3}>
        <TextField
          {...register('email')}
          color="secondary"
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email?.message}
          label="メールアドレス"
          name="email"
          size="small"
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          type="email"
          variant="filled"
        />
        <TextField
          {...register('password')}
          color="secondary"
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password?.message}
          label="パスワード"
          size="small"
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          type="password"
          variant="filled"
        />
      </Stack>

      <LoadingButton
        fullWidth
        loading={loading}
        size="large"
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
      >
        ログインする
      </LoadingButton>
    </Box>
  );
}
