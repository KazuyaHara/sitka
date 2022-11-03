import { Album } from '../../../domains/album';
import { IAlbumRepository } from '../../../interface/repository/album';
import { AlbumSubmit, IAlbumUseCase } from '../../../interface/useCase/album';

export default function useAlbumUseCase(albumRepository: IAlbumRepository): IAlbumUseCase {
  const create = async (data: AlbumSubmit) => albumRepository.create(new Album(data));

  const destroy = async (album: Album) => {
    // TODO: check the album is used in items
    await albumRepository.destroy(album);
  };

  const list = async () => albumRepository.list();

  const update = async (id: string, data: AlbumSubmit) =>
    albumRepository.update(new Album({ id, ...data }));

  return { create, destroy, list, update };
}
