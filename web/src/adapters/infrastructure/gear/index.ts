import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  FieldValue,
  getDocs,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

import { Gear } from '../../../domains/gear';
import Firebase, { handleFirestoreError } from '../firebase';

type GearData = Pick<Gear, 'maker' | 'name' | 'type'> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type CreateParams = Pick<Gear, 'maker' | 'name' | 'type'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
type UpdateParams = Omit<CreateParams, 'createdAt'>;

export interface IGearDriver {
  create(data: Gear): Promise<DocumentReference>;
  destroy(data: Gear): Promise<void>;
  list(): Promise<QuerySnapshot<GearData>>;
  update(data: Gear): Promise<void>;
}

export default function gearDriver(): IGearDriver {
  const gearsRef = collection(Firebase.instance.firetore, 'gears');

  const create = async (data: Gear) => {
    const params: CreateParams = {
      maker: data.maker,
      name: data.name,
      type: data.type,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    return addDoc(gearsRef, params).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  const destroy = async (data: Gear) =>
    deleteDoc(doc(gearsRef, data.id)).catch((error) => {
      throw handleFirestoreError(error);
    });

  const list = async () =>
    getDocs(query(gearsRef as Query<GearData>, orderBy('maker'), orderBy('name'))).catch(
      (error) => {
        throw handleFirestoreError(error);
      }
    );

  const update = async (data: Gear) => {
    const params: UpdateParams = {
      maker: data.maker,
      name: data.name,
      type: data.type,
      updatedAt: serverTimestamp(),
    };
    return setDoc(doc(gearsRef, data.id), params, { merge: true }).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  return { create, destroy, list, update };
}
