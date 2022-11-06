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

type GearData = Omit<Gear, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type CreateParams = Pick<Gear, 'items' | 'maker' | 'model' | 'name' | 'type'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
type UpdateParams = Omit<CreateParams, 'items' | 'createdAt'>;

export interface IGearDriver {
  create(data: Gear): Promise<DocumentReference>;
  destroy(data: Gear): Promise<void>;
  list(): Promise<QuerySnapshot<GearData>>;
  update(data: Gear): Promise<void>;
}

export default function gearDriver(): IGearDriver {
  const gearsRef = collection(Firebase.instance.firetore, 'gears');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const create = async ({ id, ...data }: Gear) => {
    const params: CreateParams = {
      ...data,
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

  const update = async ({ id, ...data }: Gear) => {
    const params: UpdateParams = { ...data, updatedAt: serverTimestamp() };
    return setDoc(doc(gearsRef, id), params, { merge: true }).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  return { create, destroy, list, update };
}
