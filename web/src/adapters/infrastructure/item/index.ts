import { collection, doc, FieldValue, serverTimestamp, setDoc } from 'firebase/firestore';

import { Item } from '../../../domains/item';
import { Medium } from '../../../domains/medium';
import Firebase, { handleFirestoreError } from '../firebase';

export interface IItemDriver {
  create(data: Item): Promise<void>;
  getId(): string;
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

  const getId = () => doc(itemsRef).id;

  return { create, getId };
}
