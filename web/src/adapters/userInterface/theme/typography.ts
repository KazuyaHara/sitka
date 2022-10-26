function pxToRem(value: number) {
  return `${value / 16}rem`;
}

const typography = {
  button: { fontWeight: 700, fontSize: pxToRem(14), textTransform: 'capitalize' },
  fontFamily: "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif",
} as const;

export default typography;
