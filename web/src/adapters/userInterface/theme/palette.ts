import { alpha } from '@mui/material';

const PRIMARY = {
  lighter: '#000000',
  light: '#000000',
  main: '#000000',
  dark: '#000000',
  darker: '#000000',
};
const SECONDARY = {
  lighter: '#ffffff',
  light: '#ffffff',
  main: '#ffffff',
  dark: '#ffffff',
  darker: '#ffffff',
};
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const COMMON = {
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
};

const palette = {
  light: {
    ...COMMON,
    action: { active: GREY[600] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  },
  dark: {
    ...COMMON,
    action: { active: GREY[500] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
  },
};

export default palette;
