export type Medium = {
  id: string;
  archived: boolean;
  metadata?: any;
  extension: 'jpeg' | 'jpg' | 'png' | 'mov';
  mimeType: 'image/jpeg' | 'image/png' | 'video/quicktime';
  name: string;
  path: string;
  thumbnail: string;
};
