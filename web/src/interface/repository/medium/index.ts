import { Medium } from '../../../domains/medium';

export interface IMediumRepository {
  getURL(path: string): Promise<string>;
  upload(medium: Medium, file: File): Promise<Medium>;
}
