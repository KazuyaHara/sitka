import { Medium } from '../../../domains/medium';

export interface IMediumRepository {
  getBlob(path: string): Promise<Blob>;
  getURL(path: string): Promise<string>;
  upload(medium: Medium, file: File): Promise<Medium>;
}
