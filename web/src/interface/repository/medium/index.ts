import { Medium } from '../../../domains/medium';

export interface IMediumRepository {
  upload(medium: Medium, file: File): Promise<Medium>;
}
