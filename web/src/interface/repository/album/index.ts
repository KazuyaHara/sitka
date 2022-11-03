import { Album } from '../../../domains/album';

export interface IAlbumRepository {
  create(data: Album): Promise<void>;
  list(): Promise<Album[]>;
}
