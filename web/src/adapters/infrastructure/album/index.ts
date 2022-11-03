import {
  addDoc,
  collection,
  DocumentReference,
  FieldValue,
  getDocs,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { Album } from '../../../domains/album';
import Firebase, { handleFirestoreError } from '../firebase';

type AlbumData = Pick<Album, 'name'> & {
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type CreateParams = Pick<Album, 'date' | 'name'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export interface IAlbumDriver {
  create(data: Album): Promise<DocumentReference>;
  list(): Promise<QuerySnapshot<AlbumData>>;
}

export default function albumDriver(): IAlbumDriver {
  const albumsRef = collection(Firebase.instance.firetore, 'albums');

  const create = async (data: Album) => {
    const params: CreateParams = {
      date: data.date,
      name: data.name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    return addDoc(albumsRef, params).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  const list = async () =>
    getDocs(query(albumsRef as Query<AlbumData>, orderBy('date'), orderBy('name'))).catch(
      (error) => {
        throw handleFirestoreError(error);
      }
    );

  return { create, list };
}
