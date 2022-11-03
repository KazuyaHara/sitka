import { Album } from '../../../domains/album';

export type AlbumSubmit = Pick<Album, 'date' | 'name'>;

export interface IAlbumUseCase {
  create(data: AlbumSubmit): Promise<void>;
  list(): Promise<Album[]>;
}
