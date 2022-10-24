import React from 'react';

import { GlobalStyles } from '@mui/material';

export default function GlobalCssOverride() {
  return <GlobalStyles styles={{ img: { display: 'block', maxWidth: '100%' } }} />;
}
