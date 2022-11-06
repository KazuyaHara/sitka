export type Gear = {
  id: string;
  items: number;
  maker: string | null;
  model: string;
  name: string;
  type: 'photo' | 'movie';
  createdAt: Date;
  updatedAt: Date;
};

export const getTypeJP = (type: Gear['type']) => {
  if (type === 'movie') return '動画';
  return '写真';
};
