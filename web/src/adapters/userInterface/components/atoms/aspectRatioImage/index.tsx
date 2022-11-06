/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, BoxProps } from '@mui/material';

type Props = Pick<BoxProps, 'borderRadius' | 'sx'> & { ratio?: number; src: string };

export default function AspectRatioImage({ borderRadius, ratio = 1 / 1, src, sx }: Props) {
  const ref = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(1);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.width * ratio);
    }
  }, [ref]);

  return (
    <Box
      borderRadius={borderRadius}
      component="img"
      height={height}
      ref={ref}
      src={src}
      sx={{ objectFit: 'cover', ...sx }}
      width="100%"
    />
  );
}
