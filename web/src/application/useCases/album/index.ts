import { Album } from '../../../domains/album';
import { IAlbumRepository } from '../../../interface/repository/album';
import { AlbumSubmit, IAlbumUseCase } from '../../../interface/useCase/album';

export default function useAlbumUseCase(userRepository: IAlbumRepository): IAlbumUseCase {
  const create = async (data: AlbumSubmit) => userRepository.create(new Album(data));

  const list = async () => userRepository.list();

  return { create, list };
}
