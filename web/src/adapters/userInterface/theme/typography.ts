function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': { fontSize: pxToRem(sm) },
    '@media (min-width:900px)': { fontSize: pxToRem(md) },
    '@media (min-width:1200px)': { fontSize: pxToRem(lg) },
  };
}

const typography = {
  button: { fontWeight: 700, fontSize: pxToRem(14), textTransform: 'capitalize' },
  fontFamily: "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif",
  h2: {
    fontSize: pxToRem(14),
    fontWeight: 700,
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 20 }),
  },
} as const;

export default typography;
