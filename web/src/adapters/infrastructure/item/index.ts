import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore';

import { Item } from '../../../domains/item';
import { Medium } from '../../../domains/medium';
import Firebase, { handleFirestoreError } from '../firebase';

type ItemData = Omit<Item, 'id' | 'date'> & {
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: null;
};

export interface IItemDriver {
  create(data: Item): Promise<void>;
  get(id: string): Promise<DocumentSnapshot<ItemData>>;
  getId(): string;
  softDelete(id: string): Promise<void>;
  subscribe: (
    limitNumber: number,
    onNext: (querySnapshot: QuerySnapshot<ItemData>) => void
  ) => Unsubscribe;
}

type CreateParams = {
  medium: Medium;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt: null;
};
type SoftDeleteParams = { deletedAt: FieldValue };

export default function itemDriver(): IItemDriver {
  const itemsRef = collection(Firebase.instance.firetore, 'items');

  const create = async ({ id, ...data }: Item) => {
    const params: CreateParams = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      deletedAt: null,
    };
    return setDoc(doc(itemsRef, id), params).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  const get = async (id: string) =>
    getDoc(doc(itemsRef, id) as DocumentReference<ItemData>).catch((error) => {
      throw handleFirestoreError(error);
    });

  const getId = () => doc(itemsRef).id;

  const softDelete = async (id: string) => {
    const params: SoftDeleteParams = { deletedAt: serverTimestamp() };
    return setDoc(doc(itemsRef, id), params, { merge: true }).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

  const subscribe = (
    limitNumber: number,
    onNext: (querySnapshot: QuerySnapshot<ItemData>) => void
  ) =>
    onSnapshot(
      query(
        itemsRef as Query<ItemData>,
        where('deletedAt', '==', null),
        orderBy('date', 'desc'),
        limit(limitNumber)
      ),
      onNext
    );

  return { create, get, getId, softDelete, subscribe };
}
