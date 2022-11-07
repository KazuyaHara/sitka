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
} from 'firebase/firestore';

import { Item } from '../../../domains/item';
import { Medium } from '../../../domains/medium';
import Firebase, { handleFirestoreError } from '../firebase';

type ItemData = Omit<Item, 'id' | 'date' | 'createdAt' | 'updatedAt'> & {
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export interface IItemDriver {
  create(data: Item): Promise<void>;
  get(id: string): Promise<DocumentSnapshot<ItemData>>;
  getId(): string;
  subscribe: (
    limitNumber: number,
    onNext: (querySnapshot: QuerySnapshot<ItemData>) => void
  ) => Unsubscribe;
}

type CreateParams = { medium: Medium; createdAt: FieldValue; updatedAt: FieldValue };

export default function itemDriver(): IItemDriver {
  const itemsRef = collection(Firebase.instance.firetore, 'items');

  const create = async ({ id, ...data }: Item) => {
    const params: CreateParams = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
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

  const subscribe = (
    limitNumber: number,
    onNext: (querySnapshot: QuerySnapshot<ItemData>) => void
  ) =>
    onSnapshot(
      query(itemsRef as Query<ItemData>, orderBy('date', 'desc'), limit(limitNumber)),
      onNext
    );

  return { create, get, getId, subscribe };
}
