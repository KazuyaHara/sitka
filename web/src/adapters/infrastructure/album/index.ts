import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  FieldValue,
  deleteDoc,
  getDocs,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
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
type UpdateParams = Omit<CreateParams, 'createdAt'>;

export interface IAlbumDriver {
  create(data: Album): Promise<DocumentReference>;
  destroy(data: Album): Promise<void>;
  list(): Promise<QuerySnapshot<AlbumData>>;
  update(data: Album): Promise<void>;
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

  const destroy = async (data: Album) =>
    deleteDoc(doc(albumsRef, data.id)).catch((error) => {
      throw handleFirestoreError(error);
    });

  const list = async () =>
    getDocs(query(albumsRef as Query<AlbumData>, orderBy('date'), orderBy('name'))).catch(
      (error) => {
        throw handleFirestoreError(error);
      }
    );

  const update = async (data: Album) => {
    const params: UpdateParams = { date: data.date, name: data.name, updatedAt: serverTimestamp() };
    return setDoc(doc(albumsRef, data.id), params, { merge: true }).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  return { create, destroy, list, update };
}
