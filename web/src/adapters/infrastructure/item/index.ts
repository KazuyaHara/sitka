import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  getDoc,
  getDocs,
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
  writeBatch,
  WriteBatch,
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
  listDeleted(): Promise<QuerySnapshot<ItemData>>;
  restoreItems(ids: string[]): Promise<void>;
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

  const listDeleted = async () =>
    getDocs(
      query(
        itemsRef,
        where('deletedAt', '!=', null),
        orderBy('deletedAt', 'desc')
      ) as Query<ItemData>
    ).catch((error) => {
      throw handleFirestoreError(error);
    });

  const restoreItems = async (ids: string[]) => {
    const batchArray = [] as Array<WriteBatch>;
    batchArray.push(writeBatch(Firebase.instance.firetore));
    let operationCounter = 0;
    let batchIndex = 0;

    ids.forEach((id) => {
      batchArray[batchIndex].set(doc(itemsRef, id), { deletedAt: null }, { merge: true });
      operationCounter += 1;
      if (operationCounter >= 499) {
        batchArray.push(writeBatch(Firebase.instance.firetore));
        batchIndex += 1;
        operationCounter = 0;
      }
    });
    await Promise.all(batchArray.map(async (batch) => batch.commit())).catch((error) => {
      throw handleFirestoreError(error);
    });
  };

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

  return { create, get, getId, listDeleted, restoreItems, softDelete, subscribe };
}
