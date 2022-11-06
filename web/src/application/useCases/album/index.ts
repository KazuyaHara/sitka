import { Album } from '../../../domains/album';
import { IAlbumRepository } from '../../../interface/repository/album';
import { AlbumSubmit, IAlbumUseCase } from '../../../interface/useCase/album';

export default function useAlbumUseCase(albumRepository: IAlbumRepository): IAlbumUseCase {
  const create = async (data: AlbumSubmit) => {
    const params: Album = { id: '', ...data };
    return albumRepository.create(params);
  };

  const destroy = async (album: Album) => {
    // TODO: check the album is used in items
    await albumRepository.destroy(album);
  };

  const list = async () => albumRepository.list();

  const update = async (id: string, data: AlbumSubmit) => {
    const params: Album = { id, ...data };
    return albumRepository.update(params);
  };

  return { create, destroy, list, update };
}
