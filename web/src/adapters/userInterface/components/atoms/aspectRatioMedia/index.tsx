/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

type Props = Pick<BoxProps, 'borderRadius' | 'sx'> & {
  component: 'img' | 'video';
  duration?: number;
  ratio?: number;
  src: string;
};

export default function AspectRetioMedia({
  borderRadius,
  component,
  duration,
  ratio = 1 / 1,
  src,
  sx,
}: Props) {
  const ref = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(1);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.width * ratio);
    }
  }, [ref]);

  return (
    <Box position="relative">
      <Box
        borderRadius={borderRadius}
        component={component}
        controls
        height={height}
        ref={ref}
        src={src}
        sx={{ objectFit: 'cover', ...sx }}
        width="100%"
      />
      {duration && (
        <Typography color="white" bottom={4} fontWeight="bold" position="absolute" right={8}>
          {`${`00${Math.floor(duration / 60) % 60}`.slice(-2)}:${`00${duration % 60}`.slice(-2)}`}
        </Typography>
      )}
    </Box>
  );
}
