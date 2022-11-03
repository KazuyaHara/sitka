import { Album } from '../../../domains/album';

export type AlbumSubmit = Pick<Album, 'date' | 'name'>;

export interface IAlbumUseCase {
  create(data: AlbumSubmit): Promise<void>;
  destroy(gear: Album): Promise<void>;
  list(): Promise<Album[]>;
  update(id: string, data: AlbumSubmit): Promise<void>;
}
