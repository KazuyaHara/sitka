export type Medium = {
  id: string;
  archived: boolean;
  exif?: {
    exif?: { FNumber?: number; ISO?: number; LensMake?: string; LensModel?: string };
    image?: { Make?: string; Model?: string };
  };
  extension: 'jpeg' | 'jpg' | 'png';
  mimeType: 'image/jpeg' | 'image/png';
  name: string;
  path: string;
  thumbnail: string;
};
