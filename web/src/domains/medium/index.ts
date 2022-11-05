export type Medium = {
  id: string;
  archived: boolean;
  extension: 'jpeg' | 'jpg' | 'png';
  mimeType: 'image/jpeg' | 'image/png';
  name: string;
  path: string;
  thumbnail: string;
};
