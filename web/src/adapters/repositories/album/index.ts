import { Album } from '../../../domains/album';
import { IAlbumRepository } from '../../../interface/repository/album';
import albumDriver from '../../infrastructure/album';

export default function albumRepository(): IAlbumRepository {
  const create = async (data: Album): Promise<void> => {
    await albumDriver().create(data);
  };

  const destroy = async (data: Album): Promise<void> => {
    await albumDriver().destroy(data);
  };

  const list = async (): Promise<Album[]> =>
    albumDriver()
      .list()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc): Album => {
          const data = doc.data();
          return { id: doc.id, date: data.date.toDate(), name: data.name };
        })
      );

  const update = async (data: Album): Promise<void> => {
    await albumDriver().update(data);
  };

  return { create, destroy, list, update };
}
