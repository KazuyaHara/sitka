export type Gear = { id: string; maker: string; name: string; type: 'photo' | 'movie' };

export const getTypeJP = (type: Gear['type']) => {
  if (type === 'movie') return '動画';
  return '写真';
};
