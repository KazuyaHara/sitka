import { Album } from '../../../domains/album';
import { IAlbumRepository } from '../../../interface/repository/album';
import albumDriver from '../../infrastructure/album';

export default function albumRepository(): IAlbumRepository {
  const create = async (data: Album) => {
    await albumDriver().create(data);
  };

  const list = async () =>
    albumDriver()
      .list()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new Album({ id: doc.id, date: data.date.toDate(), name: data.name });
        })
      );

  return { create, list };
}
